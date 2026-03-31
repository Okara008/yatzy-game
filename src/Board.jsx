import image1 from './assets/1-Yatzy.svg'
import image2 from './assets/2-Yatzy.svg' 
import image3 from './assets/3-Yatzy.svg' 
import image4 from './assets/4-Yatzy.svg' 
import image5 from './assets/5-Yatzy.svg' 
import image6 from './assets/6-Yatzy.svg' 
import image3x from './assets/3x-Yatzy.svg' 
import image4x from './assets/4x-Yatzy.svg' 
import imageSmall from './assets/small-Yatzy.svg' 
import imageLarge from './assets/large-Yatzy.svg' 
import image23 from './assets/2_3-Yatzy.svg' 
import imageChance from './assets/chance-Yatzy.svg' 
import imageFull from './assets/5-in-a-row-Yatzy.svg' 
import { useEffect, useRef, useState} from 'react'
import Btn_cell from './Btn_cell.jsx'

function Board({toggleRestart, hasRestarted, playTriggered, activeBoxP1, disable_playBtn, dice_indexes, triggerRoll, getTotalScore}){
    let cell_array_Ref = useRef([])
    const first_cell_index = 0;
    let [boxes, setBoxes] = useState([])
    let indexOfActiveCell = useRef()
    const [bonusp1, setBonusp1] = useState(0)
    const bonusp1Ref = useRef(0)
    const [bonusp2, setBonusp2] = useState(0)
    const bonusp2Ref = useRef(0)

    /*const totalp1Ref = useRef([3, 6, 3, 20, 15, 18, 23, 0, 25, 30, 0, 0, 0])
    const [totalp1, setTotalp1] = useState([3, 6, 3, 20, 15, 18, 23, 0, 25, 30, 0, 0, 0])
    const finalTotalp1Ref = useRef([3, 6, 3, 20, 15, 18, 23, 0, 25, 30, 0, 0, -1])
    
    const [totalp2, setTotalp2] = useState([1, 4, 9, 4, 10, 18, 0, 28, 25, 30, 0, 50, 0])
    const totalp2Ref = useRef([1, 4, 9, 4, 10, 18, 0, 28, 25, 30, 0, 50, 0])
    const finalTotalp2Ref = useRef([1, 4, 9, 4, 10, 18, 0, 28, 25, 30, 0, 50, -1])

    useEffect(() => {
        getTotalScore(finalTotalp1Ref.current, finalTotalp2Ref.current)
    })*/

    const totalp1Ref = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [totalp1, setTotalp1] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const finalTotalp1Ref = useRef([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
    
    const totalp2Ref = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [totalp2, setTotalp2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const finalTotalp2Ref = useRef([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
    
    function arrangeNumbers(array){
        for (let i = 0; i < array.length-1; i++) {
            for (let j = 0; j < array.length-1; j++) {
                if(array[j] > array[j+1]){
                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
        return array
    }

    function getOnly1Num(index){
        activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;

        for (let i = 0; i < dice_indexes.length; i++) {
            const element = dice_indexes[i];
            if(element != index){
                continue
            }
            if(activeBoxP1){
                totalp1Ref.current[index] = totalp1Ref.current[index] + (index + 1)
            }else{
                totalp2Ref.current[index] = totalp2Ref.current[index] + (index + 1)
            }
            activeBoxP1 ? setTotalp1([...totalp1Ref.current]) : setTotalp2([...totalp2Ref.current]);
        }            
    }

    function getonlyConsecutiveNums(numOfTimes, index){
        activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;
        let isTrue = false;
        let total = 0;
        
        for (let i = 0; i < dice_indexes.length; i++) {
            total = 0;
            for (let j = 0; j < dice_indexes.length; j++) {
                if(dice_indexes[i] == dice_indexes[j]){
                    total++
                }
            }
            
            if(total >= numOfTimes){
                isTrue = true
                break;
            }
        }
        
        if (isTrue && numOfTimes != 5) {
            for (let i = 0; i < dice_indexes.length; i++) {
                activeBoxP1 ? totalp1Ref.current[index] += (dice_indexes[i] + 1) : totalp2Ref.current[index] += (dice_indexes[i] + 1);
            }   
        }

        else if(isTrue && numOfTimes == 5){
            activeBoxP1 ? totalp1Ref.current[index] = 50 : totalp2Ref.current[index] = 50;
        }

        else{
            activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;
        }

        activeBoxP1 ? setTotalp1([...totalp1Ref.current]) : setTotalp2([...totalp2Ref.current]);
    }
    
    function getonly2x3Nums(index){
        activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;
        let arrayOfNums = [...dice_indexes];
        arrayOfNums = [...arrangeNumbers(arrayOfNums)];
        
        if((arrayOfNums[0] == arrayOfNums[1] && arrayOfNums[2] == arrayOfNums[3]  && arrayOfNums[3] == arrayOfNums[4])
            || (arrayOfNums[4] == arrayOfNums[3] && arrayOfNums[2] == arrayOfNums[1]  && arrayOfNums[0] == arrayOfNums[1])){
        
                activeBoxP1 ? totalp1Ref.current[index] = 25 : totalp2Ref.current[index] = 25;
        }
        else{
            activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;
            
        }
        activeBoxP1 ? setTotalp1([...totalp1Ref.current]) : setTotalp2([...totalp2Ref.current]);
    }

    function getonlySequenceNums(sequence, index){
        activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;

        if(sequence == 4){
            if((dice_indexes.includes(0) && dice_indexes.includes(1) && dice_indexes.includes(2) && dice_indexes.includes(3))||
                (dice_indexes.includes(1) && dice_indexes.includes(2) &&dice_indexes.includes(3) && dice_indexes.includes(4)) ||
                (dice_indexes.includes(2) && dice_indexes.includes(3) &&dice_indexes.includes(4) && dice_indexes.includes(5))
                ){
                    activeBoxP1 ? totalp1Ref.current[index] = 30 : totalp2Ref.current[index] = 30;
            }
        }
                
        else if(sequence == 5){
            if((dice_indexes.includes(0) && dice_indexes.includes(1) &&dice_indexes.includes(2) && dice_indexes.includes(3) && dice_indexes.includes(4)) ||
                (dice_indexes.includes(5) && dice_indexes.includes(1) &&dice_indexes.includes(2) && dice_indexes.includes(3) && dice_indexes.includes(4))){
                activeBoxP1 ? totalp1Ref.current[index] = 40 : totalp2Ref.current[index] = 40;
            }
        }
        else{
            activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;
        }
        
        activeBoxP1 ? setTotalp1([...totalp1Ref.current]) : setTotalp2([...totalp2Ref.current]);
    }
    
    function getSumOfAll(index) {
        activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;
        for (let i = 0; i < dice_indexes.length; i++) {
            if(activeBoxP1){
                totalp1Ref.current[index] += (dice_indexes[i] + 1);
            }else{
                totalp2Ref.current[index] += (dice_indexes[i] + 1);
            }
        }   
        activeBoxP1 ? setTotalp1([...totalp1Ref.current]) : setTotalp2([...totalp2Ref.current])
    }

    useEffect(()=>{
        if(hasRestarted){
            totalp1Ref.current = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            setTotalp1([...totalp1Ref.current])
            finalTotalp1Ref.current = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        
            totalp2Ref.current = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            setTotalp2([...totalp2Ref.current])
            finalTotalp2Ref.current = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
            setBonusp1(0)
            setBonusp2(0)
            
            getTotalScore(finalTotalp1Ref.current, finalTotalp2Ref.current)
            toggleRestart()
        }
    }, [hasRestarted])

    useEffect(() => {
        const current_cell = cell_array_Ref.current[indexOfActiveCell.current];
        if(indexOfActiveCell.current >= first_cell_index && playTriggered){

            if(!activeBoxP1){
                finalTotalp1Ref.current[indexOfActiveCell.current] = totalp1Ref.current[indexOfActiveCell.current];
                current_cell.textContent = finalTotalp1Ref.current[indexOfActiveCell.current];
            }
            else {
                finalTotalp2Ref.current[indexOfActiveCell.current] = totalp2Ref.current[indexOfActiveCell.current];
                current_cell.textContent = totalp2Ref.current[indexOfActiveCell.current]
            }
        }
        const cell = document.querySelectorAll(".pointBox");

        cell.forEach(box =>{
            box.disabled = true
        })

        if(current_cell){
            current_cell.classList.remove("activeBox")
        }
        bonusp1Ref.current = 0;
        bonusp2Ref.current = 0;
        for (let i = 0; i < 6; i++) {
            const element1 = finalTotalp1Ref.current[i];
            const element2 = finalTotalp2Ref.current[i];
            if(element1 >= 0){
                bonusp1Ref.current += element1;
            }
            if(element2 >= 0){
                bonusp2Ref.current += element2;
            }
        }
        bonusp1Ref.current > 63 ? bonusp1Ref.current = 63 : null;
        bonusp2Ref.current > 63 ? bonusp2Ref.current = 63 : null;
        setBonusp1(bonusp1Ref.current)
        setBonusp2(bonusp2Ref.current)

        getTotalScore(finalTotalp1Ref.current, finalTotalp2Ref.current)
    }, [playTriggered])

    useEffect(()=>{
        if(activeBoxP1){
            cell_array_Ref.current = document.querySelectorAll(".yellowsquare")
            setBoxes([...cell_array_Ref.current])
        }else{
            cell_array_Ref.current = document.querySelectorAll(".greensquare")
            setBoxes([...cell_array_Ref.current])
        }
    },[activeBoxP1])
    
    useEffect(()=>{
        if(triggerRoll > 0){
            cell_array_Ref.current.forEach( box=>{
                let index = Array.from(cell_array_Ref.current).indexOf(box)
                if((activeBoxP1 && finalTotalp1Ref.current[index] == -1) || (!activeBoxP1 && finalTotalp2Ref.current[index] == -1)){
                    box.disabled = false;
                    box.classList.remove("activeBox")
                    activeBoxP1 ? totalp1Ref.current[index] = 0 : totalp2Ref.current[index] = 0;
                    activeBoxP1 ? setTotalp1([...totalp1Ref.current]) : setTotalp2([...totalp2Ref.current])
                }
            })
        }
    }, [dice_indexes, triggerRoll])

    function boxFocus(e){
        indexOfActiveCell.current = Array.from(cell_array_Ref.current).indexOf(e.target);
        disable_playBtn(false)
        for (let i = 0; i < cell_array_Ref.current.length; i++) {
            cell_array_Ref.current[i].classList.remove("activeBox");
            if(activeBoxP1 && finalTotalp1Ref.current[i] == -1){
                totalp1Ref.current[i] = 0
            }else if(!activeBoxP1 && finalTotalp2Ref.current[i] == -1){
                totalp2Ref.current[i] = 0
            }
        }
        e.target.classList.add("activeBox");
        
        switch (indexOfActiveCell.current) {
            case 0:
                getOnly1Num(0)
                break;
            case 1:
                getOnly1Num(1)
                break;
            case 2:
                getOnly1Num(2)
                break;
            case 3:
                getOnly1Num(3)
                break;
            case 4:
                getOnly1Num(4)
                break;
            case 5:
                getOnly1Num(5)
                break;
            case 6:
                getonlyConsecutiveNums(3, 6)
                break;
            case 7:
                getonlyConsecutiveNums(4, 7)
                break;
            case 8:
                getonly2x3Nums(8)
                break;
            case 9:
                getonlySequenceNums(4, 9)
                break;
            case 10:
                getonlySequenceNums(5, 10)
                break;
            case 11:
                getonlyConsecutiveNums(5, 11)
                break;
            case 12:
                getSumOfAll(12)
                break;
        
            default:
                break;
        }
        console.log(totalp2Ref.current);

        setTotalp1([...totalp1Ref.current])
        setTotalp2([...totalp2Ref.current])
    }

    return(
        <main>
            <section>
                <Btn_cell image={image1} content="Count only 1's" boxFocus={boxFocus} totalp1={totalp1[0]} totalp2={totalp2[0]}/>
                <Btn_cell image={image2} content="Count only 2's" boxFocus={boxFocus} totalp1={totalp1[1]} totalp2={totalp2[1]}/>
                <Btn_cell image={image3} content="Count only 3's" boxFocus={boxFocus} totalp1={totalp1[2]} totalp2={totalp2[2]}/>
                <Btn_cell image={image4} content="Count only 4's" boxFocus={boxFocus} totalp1={totalp1[3]} totalp2={totalp2[3]}/>
                <Btn_cell image={image5} content="Count only 5's" boxFocus={boxFocus} totalp1={totalp1[4]} totalp2={totalp2[4]}/>
                <Btn_cell image={image6} content="Count only 6's" boxFocus={boxFocus} totalp1={totalp1[5]} totalp2={totalp2[5]}/>
                
                <div className="bonus">
                    <div><small>BONUS</small> <b>+35</b></div>
                    <div>
                        <p>{bonusp1}/63</p>
                        <progress value={bonusp1} max='63'/>
                    </div>
                    <div>
                    <p>{bonusp2}/63</p>
                        <progress value={bonusp2} max='63'/>
                    </div>
                </div>
            </section>

            <section>
                <Btn_cell image={image3x} content="Count only with 3 of a kind" boxFocus={boxFocus} totalp1={totalp1[6]} totalp2={totalp2[6]}/>
                <Btn_cell image={image4x} content="Count only with 4 of a kind" boxFocus={boxFocus} totalp1={totalp1[7]} totalp2={totalp2[7]}/>
                <Btn_cell image={image23} content="Count only with 2 of a kind & 3 of a kind (25 pts)" boxFocus={boxFocus} totalp1={totalp1[8]} totalp2={totalp2[8]}/>
                <Btn_cell image={imageSmall} content="Count only with sequence of 4 (30 pts)" boxFocus={boxFocus} totalp1={totalp1[9]} totalp2={totalp2[9]}/>
                <Btn_cell image={imageLarge} content="Count only with sequence of 5 (40 pts)" boxFocus={boxFocus} totalp1={totalp1[10]} totalp2={totalp2[10]}/>
                <Btn_cell image={imageFull} content="Count only with 5 of a kind (50 pts)" boxFocus={boxFocus} totalp1={totalp1[11]} totalp2={totalp2[11]}/>
                <Btn_cell image={imageChance} content="Sum of any combination" boxFocus={boxFocus} totalp1={totalp1[12]} totalp2={totalp2[12]}/>
            </section>
        </main>
    )
}

export default Board;