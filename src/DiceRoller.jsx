import { useEffect,useRef } from 'react';
import img from './assets/card_cover-Yatzy.svg';
import image1 from './assets/1-Yatzy.svg'
import image2 from './assets/2-Yatzy.svg' 
import image3 from './assets/3-Yatzy.svg' 
import image4 from './assets/4-Yatzy.svg' 
import image5 from './assets/5-Yatzy.svg' 
import image6 from './assets/6-Yatzy.svg' 

function DiceRoller({player, numOfRolls, dice_starting_index, return_dice_indexes, disable_rollBtn}){
    const imgPhotos = useRef([image1, image2, image3, image4, image5, image6]);
    const dice_random_indexes = useRef([]);
    const num_of_dices = 5;
    const save_dice = (e) => {
        if(numOfRolls > 0){
            e.target.classList.toggle("confirmedDice");
            let rolling_dice = document.querySelectorAll('.diceRolles');
            let all_dices_saved = true;
            for (let i = dice_starting_index; i < (dice_starting_index + num_of_dices); i++) {
                const element = rolling_dice[i];
                if(!element.classList.contains("confirmedDice")){
                    all_dices_saved = false;
                    break
                }
            }
            if (all_dices_saved) {
                disable_rollBtn(true);
            }else if(numOfRolls < 3){
                disable_rollBtn(false);
            }
            
        }
    }
    
    useEffect(()=>{
        if (numOfRolls > 0 && numOfRolls <= 3) {
            let rolling_dice = document.querySelectorAll(".diceRolles");
            
            for (let i = dice_starting_index; i < (dice_starting_index + num_of_dices); i++) {
                let array_index = i - dice_starting_index
                const element = rolling_dice[i];
                if(element.classList.contains("confirmedDice")){
                    continue
                }
                
                if(dice_random_indexes.current.length == num_of_dices){
                    let rand = Math.floor(Math.random() * 6);
                    if(!element.classList.contains("confirmedDice")){
                        dice_random_indexes.current[array_index] = rand; 
                    }
                }else{
                    dice_random_indexes.current.push(Math.floor(Math.random() * 6))
                    // dice_random_indexes.current = [1, 4, 5, 4, 5];
                }
                element.src = imgPhotos.current[dice_random_indexes.current[array_index]]
            }
            
        }
        return_dice_indexes(dice_random_indexes.current)
        
    }, [numOfRolls])
    

    return(<>
        <section className="diceRoller">
            <img src={img} alt="dice" draggable="false" onClick={(e) => save_dice(e)} className={`diceRolles ${player}`}/>
            <img src={img} alt="dice" draggable="false" onClick={(e) => save_dice(e)} className={`diceRolles ${player}`}/>
            <img src={img} alt="dice" draggable="false" onClick={(e) => save_dice(e)} className={`diceRolles ${player}`}/>
            <img src={img} alt="dice" draggable="false" onClick={(e) => save_dice(e)} className={`diceRolles ${player}`}/>
            <img src={img} alt="dice" draggable="false" onClick={(e) => save_dice(e)} className={`diceRolles ${player}`}/>
        </section>
    </>)
}

export default DiceRoller;