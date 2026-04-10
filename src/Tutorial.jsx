import tutorial_roll from './assets/tutorial_roll.png'
import tutorial_confirm_score from './assets/tutorial_confirm_score.png'
import tutorial_lock_dice from './assets/tutorial_lock_dice.png'
import tutorial_score_board from './assets/tutorial_score_board.png'
import tutorial_tool_tip from './assets/tutorial_tool_tip.png'
import x_button from './assets/x_icon.png'
import { useRef, useState } from 'react'

function Tutorial({wasClicked, removeTutorial}) {
    const tutorial_display_ref = useRef([
        {img: tutorial_roll, info: "Hit the Roll button to play → You can roll up to 3 times on your turn."},
        {img: "", info: "No need to use all three rolls. Stop early if you're satisfied with your dice!"},
        {img: tutorial_tool_tip, info: "Hover over / tap each scoring box to learn how points are calculated."},
        {img: tutorial_lock_dice, info: "Tap dice to lock them → locked dice won't change on next roll."},
        {img: tutorial_confirm_score, info: "Tap the box with your color to preview your points → Hit PLAY to record that score for your turn."},
        {img: tutorial_score_board, info: "Your total score appears here on the scoreboard."},
        {img: "", info: "After every cell is played, a winner is announced. If scores are tied, it's a draw."},
    ]) 
    const [tutorial_display] = useState([...tutorial_display_ref.current])
    const [disable_btn, set_disable_btn] = useState({prev: true, next: false})
    const index_of_display_ref = useRef(0)
    const [index_of_display, set_index_of_display] = useState(index_of_display_ref.current)

    const update_index = (num) => {
        index_of_display_ref.current += num
        set_index_of_display(index_of_display_ref.current)
        set_disable_btn(pre => ({...pre, next: (index_of_display_ref.current === (tutorial_display_ref.current.length - 1) ? true : false)}))
        set_disable_btn(pre => ({...pre, prev: (index_of_display_ref.current === (0) ? true : false)}))
    }

    return(<>
        {wasClicked && ( 
            <div className="outerShell tutorial_page">
                <section className="tutorialSection">
                    <img src={x_button} alt="x" className="x_button" onClick={removeTutorial}/>
                    <div className="tutorial_img_display">
                        <small id="page_num">{index_of_display + 1}</small>
                        {
                            tutorial_display[index_of_display].img &&
                            (<img src={tutorial_display[index_of_display].img} alt="Tutorial Image" id='display_img'/>)
                        }
                        <p className="tutorial_info">{tutorial_display[index_of_display].info}</p>
                    </div>
                    <div className="tutorial_btns">
                        <button disabled={disable_btn.prev} id='tutorial_Previous' onClick={() => update_index(-1)}>Previous</button>
                        <button disabled={disable_btn.next} id='tutorial_Next' onClick={() => update_index(1)}>Next</button>
                    </div>
                </section>
            </div>
        )}
    </>)
}

export default Tutorial