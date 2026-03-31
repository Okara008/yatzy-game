function ScoreBoard({player_names, score1, score2}){
    return (
        <header>
            <div className="playerScores">
                <span className="name">{player_names.p1}</span>
                <span className="score">{score1}</span>
            </div>
            <div className="versus">VS</div>
            <div className="playerScores">
                <span className="name">{player_names.p2}</span>
                <span className="score">{score2}</span>
            </div>
        </header>
    )
}

export default ScoreBoard;