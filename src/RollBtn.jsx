function RollBtn({triggerRoll, disableRoll, disablePlay, handle_play, playerTurn}){
    return(<>
        <footer>
            <button id="btnRoll" onClick={triggerRoll} disabled={disableRoll}>
                <div id={playerTurn ? "playerSquare" : "playerCircle"}></div>
                <p>Roll</p>
                <span className='clickCount'>1</span>
                <span className='clickCount'>2</span>
                <span className='clickCount'>3</span>
            </button>
            <button id="btnPlay" onClick={handle_play} disabled={disablePlay}>
                <p>play</p>
            </button>
        </footer>
    </>)
}

export default RollBtn;