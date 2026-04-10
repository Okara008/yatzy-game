import IMG from "./assets/restart.svg"
import {useState } from "react"


function Winner({winner_name, wasWon, restartGame , playerStats, isGuest}){
    const [showStats, setShowStats] = useState({p1: false, p2: false})

    const format_name = (name) => {
        if (name) return (name.charAt(name.length-1).toLowerCase() != 's' ? `${name}'s` : `${name}'`)
    } 

    return(
        <div  id="winner_page" className="outerShell hideSection">
            <section id="winnerSection">
                <h3>{wasWon ? "Winner" : "Draw"}</h3>
                <button id="restartGame" title="Restart" onClick={restartGame}>
                    <img src={IMG} alt="image" id="restartImg" />
                </button>
                <p id="winner_name_display">{winner_name}</p>
            
                <div className="statsContainer">
                    {!isGuest.p1 && <div>
                        <button className="view_stats_btn" style={{backgroundColor: "yellow"}} onClick={() => setShowStats({...showStats, p1: !showStats.p1})}>
                            View {format_name(playerStats.p1['username'])} Stats
                        </button>
                        {showStats.p1 && (
                            <div className="view_main_stats">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Wins:</th>
                                            <td>{playerStats.p1['wins']}</td>
                                        </tr>
                                        <tr>
                                            <th>Draws:</th>
                                            <td>{playerStats.p1['draws']}</td>
                                        </tr>
                                        <tr>
                                            <th>Losses:</th>
                                            <td>{playerStats.p1['losses']}</td>
                                        </tr>
                                        <tr>
                                            <th>Average Points:</th>
                                            <td>{playerStats.p1['avg_points']}</td>
                                        </tr>
                                        <tr>
                                            <th>Highest points:</th>
                                            <td>{playerStats.p1['highest_points']}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>}
            
                    {!isGuest.p2 && <div>
                        <button className="view_stats_btn" style={{backgroundColor: "springgreen"}} onClick={() => setShowStats({...showStats, p2: !showStats.p2})}>
                            View {format_name(playerStats.p2['username'])} Stats
                        </button>
                        {showStats.p2 && (
                        <div className="view_main_stats">
                                <table>
                            <tbody>
                                    <tr>
                                        <th>Wins:</th>
                                        <td style={{color: "springgreen"}}>{playerStats.p2['wins']}</td>
                                    </tr>
                                    <tr>
                                        <th>Draws:</th>
                                        <td style={{color: "springgreen"}}>{playerStats.p2['draws']}</td>
                                    </tr>
                                    <tr>
                                        <th>Losses:</th>
                                        <td style={{color: "springgreen"}}>{playerStats.p2['losses']}</td>
                                    </tr>
                                    <tr>
                                        <th>Average Points:</th>
                                        <td style={{color: "springgreen"}}>{playerStats.p2['avg_points']}</td>
                                    </tr>
                                    <tr>
                                        <th>highest_points:</th>
                                        <td style={{color: "springgreen"}}>{playerStats.p2['highest_points']}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        )}
                    </div>}
                </div>
            </section>
        </div>
    )
}
export default Winner