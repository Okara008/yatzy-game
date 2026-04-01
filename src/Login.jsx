import { useState, useRef, useEffect} from "react"

function Login({getNames}) {
    let [name, setName] = useState({p1: "", p2: ""})
    let [errorMessage, setErrorMessage] = useState({p1: "", p2: ""})
    let isAuthenticated = useRef({p1:true, p2: true})
    const [isLoading, setIsLoading] = useState(false);

    async function getLoginMethod(){
        let p1_Login = document.getElementsByName('login_option1');
        let p2_Login = document.getElementsByName('login_option2');
        let updated_name = {...name}

        let p1Valid = false;
        let p2Valid = false;
        let p1Selected = null;
        let p2Selected = null;

        // Get the method of login (Guest or Create New Account)
        for(let method of p1_Login){
            if(method.checked) p1Selected = method.value;
        }
        for(let method of p2_Login){
            if(method.checked) p2Selected = method.value;
        }

        // Validate Player 1 username
        if(p1Selected === "create"){
            p1Valid = await validate_user_exists(name.p1, 0);
            p1Valid = !p1Valid;
            if(updated_name.p1 == ""){
                p1Valid = false
                setErrorMessage(prev => ({...prev, p1: "Username empty"}));
            } 
        }
        else if(p1Selected === "guest"){
            p1Valid = true;
            updated_name.p1 = "";
        }
        else if(name.p1){
            p1Valid = await validate_user_exists(name.p1, 0);
        }
        else{
            setErrorMessage(prev => ({...prev, p1: "Username Field is Empty"}))
        }

        // Validate Player 2 username
        if(p2Selected === "create"){
            p2Valid = await validate_user_exists(name.p2, 1);
            p2Valid = !p2Valid;
            
            if(updated_name.p2 == ""){
                p2Valid = false
                setErrorMessage(prev => ({...prev, p2: "Username empty"}));
            } 
        }
        else if(p2Selected === "guest"){
            p2Valid = true;
            updated_name.p2 = "";
        }
        else if(name.p2){
            p2Valid = await validate_user_exists(name.p2, 1);
        }
        else{
            setErrorMessage(prev => ({...prev, p2: "Username Field is Empty"}))
        }

        // (Player 1 === Player 2) ? 
        if((updated_name.p1 != "") && (name.p1.toLowerCase() === name.p2.toLowerCase())){
            setErrorMessage(prev => ({...prev, p2: "Player 1 & 2 cannot be identical"}));
            p2Valid = false;
        }

        //If valid, reset error messages
        if(p1Valid){
            setErrorMessage(prev => ({...prev, p1: ""}));
        }
        if(p2Valid){
            setErrorMessage(prev => ({...prev, p2: ""}));
        }
        if(p1Valid && p2Valid){
            if(p1Selected == "create"){
                isAuthenticated.current.p1 = await create_user_row(name.p1, 0)
            }else if(p1Selected == "guest"){
                isAuthenticated.current.p1 = true
            }else if(name.p1){
                isAuthenticated.current.p1 = true;
            }

            if(p2Selected == "create"){
                isAuthenticated.current.p2 = await create_user_row(name.p2, 1)
            }else if(p2Selected == "guest"){
                isAuthenticated.current.p2 = true
            }else if(name.p2){
                isAuthenticated.current.p2 = true;
            }
            
            if(isAuthenticated.current.p1 && isAuthenticated.current.p2){
                getNames(updated_name)
            }

        }
    }

    async function create_user_row(name, index){
        try{
            const response = await fetch("https://yatzy-backend.infinityfreeapp.com/api_insert_new_user.php",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name })
                
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            if(index == 0){
                setErrorMessage(prev => ({...prev, p1: data.message}))
            }else{
                setErrorMessage(prev => ({...prev, p2: data.message}))
            }
            return data.success
        }catch(error){
            console.error("Connection error:", error.message);
            setErrorMessage(prev => ({...prev, p1: "Cannot connect to server"}));
            return false
        }
    }

    async function validate_user_exists(name, index){
        if(!name) return false;
        setIsLoading(true);
        try {
            const response = await fetch("https://yatzy-backend.infinityfreeapp.com/api_validate_user_exists.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ name: name })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            if(index == 0){
                setErrorMessage(prev => ({...prev, p1: data.message}));
            }else{
                setErrorMessage(prev => ({...prev, p2: data.message}));
            }
            
            return data.success;
        } catch(error) {
            console.error("Connection error:", error.message);
            if(index == 0){
                setErrorMessage(prev => ({...prev, p1: "Cannot connect to server"}));
            }else{
                setErrorMessage(prev => ({...prev, p2: "Cannot connect to server"}));
            }
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }

    function clearRadio(index){
        if(index == 0){
            const radioBtns = document.querySelectorAll("input[name='login_option1']:checked");
            radioBtns.forEach(button =>{
                button.checked = false
            })
        }
        else{
            const radioBtns = document.querySelectorAll("input[name='login_option2']:checked");
            radioBtns.forEach(button =>{
                button.checked = false
            })
        }
    }

    useEffect(()=>{
        document.getElementById("loginForm").addEventListener("submit", (e) =>{
            e.preventDefault()
        })
    }, [])

return(
    <div className="outerShell">
        <form id="loginForm"  className="innertext">
            <h3>Welcome, Let's Play</h3>
            <div className="form_content">
                <div className="square_user">
                    <input type="text" onFocus={() => clearRadio(0)} onChange={(e) => setName({...name, p1: e.target.value})} placeholder="Enter Username..."/>
                    <small className="errorMessage">{errorMessage.p1}</small>
                    <div className="login_btns">
                        <label className="create_btn" title="Create a new user">
                            <input type="radio" value="create" hidden name="login_option1"/>
                            <p className="check_box_text">Create</p>
                        </label>
                        <label className="guest_login_btn">
                            <input type="radio" value="guest" hidden name="login_option1"/>
                            <p className="guest_login_text" title="Continue as guest...">Guest</p>
                        </label>
                    </div>
                </div>
                
                <div className="circle_user">
                    <input type="text" onFocus={() => clearRadio(1)} onChange={(e) => setName({...name, p2: e.target.value})} placeholder="Enter Username..."/>
                    <small className="errorMessage">{errorMessage.p2}</small>
                    <div className="login_btns">
                        <label className="create_btn" title="Create a new user">
                            <input type="radio" value="create" hidden name="login_option2"/>
                            <p className="check_box_text">Create</p>
                        </label>
                        <label className="guest_login_btn">
                            <input type="radio" value="guest" hidden name="login_option2"/>
                            <p className="guest_login_text" title="Continue as guest...">Guest</p>
                        </label>
                    </div>
                </div>
            </div>
            <button className="start_game_btn" type="submit" onClick={getLoginMethod}>
            {isLoading ? <div className="loading-spinner"></div> :
                "Start Game" }</button>
        </form>
    </div>
)
}

export default Login