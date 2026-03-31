import DiceRoller from './DiceRoller.jsx'
import RollBtn from './RollBtn.jsx'
import Board from './Board.jsx'
import Winner from './Winner.jsx'
import ScoreBoard from './ScoreBoard.jsx'
import {useState, useRef, useEffect} from 'react'
import DICE_COVER_IMG from './assets/card_cover-Yatzy.svg';
import Login from './Login.jsx'

function Game(){
    const dice_indexesRef = useRef([]);
    const [dice_indexes, set_dice_indexes] = useState([]);
    let [clickCount, setClickCount] = useState(0); 
    let dice_starting_index = useRef(0);
    let [isPlayDisabled, setPlayBtnDisabled] = useState(true); 
    let [isRollDisabled, setRollBtnDisabled] = useState(false); 
    const playTriggeredRef = useRef(0);
    const [playTriggered, setPlayTriggered] = useState(0);
    let isplayer1Ref = useRef(true);
    let [isplayer1, setisplayer1] = useState(true);
    const [winner_name, set_winner_name] = useState();
    const [wasWon, setWasWon] = useState();
    const [hasRestarted, setHasRestarted] = useState(false);
    const playerNameRef = useRef({p1: "Square", p2: "Circle"})
    const [name, setName] = useState({...playTriggeredRef.current})
    const [isGuest, setIsGuest] = useState({p1: "", p2: ""})
    const isGuestRef = useRef({p1: "", p2: ""})
    const [playerStats, setPlayerStats] = useState({p1: "", p2: ""})
    const playerStatsRef = useRef({p1: "", p2: ""})
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    let hasFinished = useRef(true); 
    let bonusp1 = useRef(0);
    const bonusp2 = useRef(0)
    const [finalTotalp1, setfinalTotalp1] = useState(0)
    const finalScorep1Ref = useRef(0)
    const [finalTotalp2, setfinalTotalp2] = useState(0)
    const finalScorep2Ref = useRef(0)

    const triggerRoll = ()=>{
        if (clickCount >= 2) {
            disable_rollBtn(true);
        }
        if(clickCount < 3){
            const clickCount_number_boxes = Array.from(document.querySelectorAll(".clickCount"));
            clickCount_number_boxes[clickCount].style.backgroundColor = "rgba(255,255,255,.4)"
            clickCount_number_boxes[clickCount].style.borderColor = "transparent"
        }

        isplayer1Ref.current ?  dice_starting_index.current = 0 :  dice_starting_index.current = 5;

        setClickCount(c => c + 1)
        
    }

    const return_dice_indexes = (indexes)=>{
        dice_indexesRef.current = indexes
        set_dice_indexes([...dice_indexesRef.current])
    }

    const disable_playBtn = (toDisable)=>{
        let playBtn = document.getElementById("btnPlay")
        playBtn.disabled = toDisable;
        setPlayBtnDisabled(toDisable);
    }

    const disable_rollBtn = (toDisable)=>{
        let playBtn = document.getElementById("btnRoll")
        playBtn.disabled = toDisable;
        setRollBtnDisabled(toDisable);
    }

    const handle_play = () =>{
        setClickCount(0);
        const clickCount_number_boxes = Array.from(document.querySelectorAll(".clickCount"));
        const rolling_dice = Array.from(document.querySelectorAll(".diceRolles"));
        clickCount_number_boxes.forEach(box => {
            box.style.backgroundColor = "white"
            box.style.borderColor = "black"
        })
        rolling_dice.forEach(box => {
            box.src = DICE_COVER_IMG
        })
        isplayer1Ref.current = !isplayer1Ref.current;
        setisplayer1(isplayer1Ref.current)
        set_dice_indexes([])
        playTriggeredRef.current ++
        setPlayTriggered(playTriggeredRef.current)
        disable_playBtn(true)

        const confirmedDice = Array.from(document.querySelectorAll(".confirmedDice"))
        confirmedDice.forEach(dice =>{
            dice.classList.remove("confirmedDice");
        })
        disable_rollBtn(false)
    }

    const getTotalScore = async (score1, score2) =>{
        const num_of_left_dice = 6
        bonusp1.current = 0
        bonusp2.current = 0
        for (let i = 0; i < num_of_left_dice; i++) {
            const total1 = score1[i];
            const total2 = score2[i];
            if(total1 >= 0){
                bonusp1.current += total1;
            }
            if(total2 >= 0){
                bonusp2.current += total2;
            }
        }

        bonusp1.current >= 63 ? finalScorep1Ref.current = 35 : finalScorep1Ref.current = 0
        bonusp2.current >= 63 ? finalScorep2Ref.current = 35 : finalScorep2Ref.current = 0
        for (let i = 0; i < score1.length; i++) {
            const element1 = score1[i];
            const element2 = score2[i];
            if(element1 > -1){
                finalScorep1Ref.current += element1;
            }
            if(element2 > -1){
                finalScorep2Ref.current += element2;
            }
        }    
        
        setfinalTotalp1(finalScorep1Ref.current);
        setfinalTotalp2(finalScorep2Ref.current);
        hasFinished.current = true
        for (let i = 0; i < score1.length; i++) {
            const element1 = score1[i];
            const element2 = score2[i];
            if(element1 < 0 || element2 < 0){
                hasFinished.current = false;
                break
            }

        }

        if (hasFinished.current) {
            await getWinner(finalScorep1Ref, name)
        }
    }

    const getPlayersStats = async (name) => {
        try {
            const response = await fetch("http://localhost/PHP/Yatzy/api_retrieve_stats.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ name: name})
            });
            const data = await response.json();
            return data;
        } catch(error) {
            return false;
        }
    }

    const getWinner = async (finalScorep1Ref, name) => {
        document.getElementById("winnerSection").classList.remove("hideSection")
        if(finalScorep1Ref.current > finalScorep2Ref.current){
            set_winner_name(name.p1)
            !isGuest.p1 ? await updateOutcome(name.p1, "wins", finalScorep1Ref.current) : null
            !isGuest.p2 ? await updateOutcome(name.p2, "losses", finalScorep2Ref.current) : null
            setWasWon(true)
        }
        else if(finalScorep1Ref.current < finalScorep2Ref.current){
            set_winner_name(name.p2)
            !isGuest.p1 ? await updateOutcome(name.p1, "losses", finalScorep1Ref.current) : null
            !isGuest.p2 ? await updateOutcome(name.p2, "wins", finalScorep2Ref.current) : null
            setWasWon(true)
        }
        else{
            set_winner_name(`${name.p1} 🤝 ${name.p2}`)
            !isGuest.p1 ? await updateOutcome(name.p1, "draws", finalScorep1Ref.current) : null
            !isGuest.p2 ? await updateOutcome(name.p2, "draws", finalScorep2Ref.current) : null
            setWasWon(false)
        }
        disable_rollBtn(true)
        const statsP1 = await getPlayersStats(name.p1);
        const statsP2 = await getPlayersStats(name.p2);
        playerStatsRef.current = { p1: statsP1, p2: statsP2 };
        setPlayerStats({...playerStatsRef.current})
        setHasUnsavedChanges(false)
    }
    
    const toggleRestart = () => {
        setHasRestarted(false)
    }

    const restartGame = () =>{
        document.getElementById("winnerSection").classList.add("hideSection")
        disable_rollBtn(false)
        setHasRestarted(true)
        const login_page = document.querySelector(".outerShell");
        login_page.classList.remove("hideSection")
    }

    const getNames = (player_name) => {
        isGuestRef.current = {p1: (player_name.p1 ? false : true), p2: (player_name.p2 ? false : true)}
        setIsGuest({...isGuestRef.current})
        playerNameRef.current = {p1: (player_name.p1 ? player_name.p1 : "Square"), p2: (player_name.p2 ? player_name.p2 : "Circle")}
        setName({...playerNameRef.current})
        
        const login_page = document.querySelector(".outerShell");
        login_page.classList.add("hideSection")
        setHasUnsavedChanges(true)
    }

    /*useEffect(()=>{
        getNames({p1: "James", p2: "Kelly"})
    }, [])*/

    useEffect(() =>{
        const handleBeforeUnload = (event) => {
            if(hasUnsavedChanges){
                event.preventDefault();
                event.returnValue = '';

            }
        }
        window.addEventListener("beforeunload", handleBeforeUnload)
        return ()=>{
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [hasUnsavedChanges])
    
    const updateOutcome = async (name, outcome, score) => {
        try {
            const response = await fetch("http://localhost/PHP/Yatzy/api_game_outcome.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ name: name, outcome: outcome, score: score})
            });
            const data = await response.json();
            return data.success;
        } catch(error) {
            return false;
        }
    
    }

    return(<>
        <Login getNames={getNames}/>
        <ScoreBoard player_names={name} score1={finalTotalp1} score2 ={finalTotalp2}/>
        <article>
            <DiceRoller player="p1Dice" active={isplayer1} return_dice_indexes={return_dice_indexes} numOfRolls={clickCount} dice_starting_index={dice_starting_index.current} disable_rollBtn={disable_rollBtn}/>
            <Board toggleRestart={toggleRestart} playTriggered={playTriggered} activeBoxP1={isplayer1} triggerRoll={clickCount} dice_indexes={dice_indexes} disable_playBtn={disable_playBtn} getTotalScore={getTotalScore} hasRestarted={hasRestarted}/>
            <DiceRoller player="p2Dice" active={!isplayer1} return_dice_indexes={return_dice_indexes} numOfRolls={clickCount} dice_starting_index={dice_starting_index.current} disable_rollBtn={disable_rollBtn}/>
        </article>
        <RollBtn triggerRoll={triggerRoll} handle_play={handle_play} disableRoll={isRollDisabled} disablePlay={isPlayDisabled} playerTurn={isplayer1}/>
        <Winner isGuest={isGuest} winner_name={winner_name} playerStats={playerStats} wasWon={wasWon} restartGame={restartGame}/>
    
    </>)
}

export default Game;