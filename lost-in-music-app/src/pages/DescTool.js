// Blog.js
import React from 'react'
import Navbar from '../components/Navbar'
import './DescTool.css'
import GenreProcessor from "../GenreProcessor"

function DescTool() {

    // Function to handle striking out words in the table
    function handleTextareaInput() {
        const textarea = document.querySelector("#descriptor-area");
        const typedWords = textarea.value.split(";").map(word => word.trim());

        // Reset all strikes first
        document.querySelectorAll(".strike").forEach(element => {
            element.classList.remove("strike");
        });

        // Strike out words in the table that match typed words
        typedWords.forEach(word => {
            const buttonElement = document.getElementById(word);
            if (buttonElement) {
                buttonElement.classList.add("strike");
            }
        });
    }

    // Function to handle the "Copy All" button
    function copyAll() {
        const textarea = document.querySelector("#descriptor-area");
        textarea.select();
        document.execCommand("copy");

        // navigator.clipboard.writeText(textarea);
        // alert("Copied all text to clipboard!");
    }

    function writeText(descriptor) {
        let classes = document.getElementById(descriptor)
        classes.classList.add("strike")

        if (document.querySelector("#descriptor-area").value === "") {
            document.querySelector("#descriptor-area").value += descriptor
        } else {
            document.querySelector("#descriptor-area").value += `; ${descriptor}`
        }
    }

    // function reset() {
    //     let classes = document.getElementsByClassName("strike")

    //     for (let i = classes.length-1; i >= 0; i--) {
    //         classes[i].classList.remove("strike")
    //     }

    //     document.querySelector("#descriptor-area").value = ""

    // }

    // Function to handle reset
    function reset() {
        const struckElements = document.querySelectorAll(".strike");
        struckElements.forEach(element => element.classList.remove("strike"));
        document.querySelector("#descriptor-area").value = "";
    }

    return (<div>

        <Navbar />

        <div className="desc-tool">

        <h1>Descriptor Tool</h1>

        <table border="2">
            <tbody>
                <tr>
                    <td className="catchy" id="catchy"><button onClick={() => writeText("catchy")}>catchy</button></td>
                    <td className="positive" id="happy"><button onClick={() => writeText("happy")}>happy</button></td>
                    <td className="passionate" id="passionate"><button onClick={() => writeText("passionate")}>passionate</button></td>
                    <td className="rich" id="luxurious"><button onClick={() => writeText("luxurious")}>luxurious</button></td>
                    <td className="soft" id="soft"><button onClick={() => writeText("soft")}>soft</button></td>
                    <td className="sad" id="sad"><button onClick={() => writeText("sad")}>sad</button></td>
                    <td className="tough" id="angry"><button onClick={() => writeText("angry")}>angry</button></td>
                    <td className="gray" id="light black"><button onClick={() => writeText("light black")}>light black</button></td>
                    <td className="icy" id="icy"><button onClick={() => writeText("icy")}>icy</button></td>
                </tr>
                <tr>
                    <td className="repetitive" id="repetitive"><button onClick={() => writeText("repetitive")}>repetitive</button></td>
                    <td className="positive" id="uplifting"><button onClick={() => writeText("uplifting")}>uplifting</button></td>
                    <td className="passionate" id="resolute"><button onClick={() => writeText("resolute")}>resolute</button></td>
                    <td className="rich" id="diamond"><button onClick={() => writeText("diamond")}>diamond</button></td>
                    <td className="soft" id="relaxation"><button onClick={() => writeText("relaxation")}>relaxation</button></td>
                    <td className="sad" id="bittersweet"><button onClick={() => writeText("bittersweet")}>bittersweet</button></td>
                    <td className="tough" id="aggressive"><button onClick={() => writeText("aggressive")}>aggressive</button></td>
                    <td className="dark" id="scary"><button onClick={() => writeText("scary")}>scary</button></td>
                    <td className="aquatic" id="aquatic"><button onClick={() => writeText("aquatic")}>aquatic</button></td>
                </tr>
                <tr>
                    <td className="complex" id="complex"><button onClick={() => writeText("complex")}>complex</button></td>
                    <td className="positive" id="optimistic"><button onClick={() => writeText("optimistic")}>optimistic</button></td>
                    <td className="passionate" id="epic"><button onClick={() => writeText("epic")}>epic</button></td>
                    <td className="rich" id="lush"><button onClick={() => writeText("lush")}>lush</button></td>
                    <td className="soft" id="sunset"><button onClick={() => writeText("sunset")}>sunset</button></td>
                    <td className="sad" id="melancholic"><button onClick={() => writeText("melancholic")}>melancholic</button></td>
                    <td className="tough" id="violence"><button onClick={() => writeText("violence")}>violence</button></td>
                    <td className="dark" id="ominous"><button onClick={() => writeText("ominous")}>ominous</button></td>
                    <td className="tropical" id="tropical"><button onClick={() => writeText("tropical")}>tropical</button></td>
                </tr>
                <tr>
                    <td className="complex" id="progressive"><button onClick={() => writeText("progressive")}>progressive</button></td>
                    <td className="positive" id="triumphant"><button onClick={() => writeText("triumphant")}>triumphant</button></td>
                    <td className="passionate" id="anthemic"><button onClick={() => writeText("anthemic")}>anthemic</button></td>
                    <td className="otherworldly" id="ethereal"><button onClick={() => writeText("ethereal")}>ethereal</button></td>
                    <td className="peaceful" id="peaceful"><button onClick={() => writeText("peaceful")}>peaceful</button></td>
                    <td className="sad" id="somber"><button onClick={() => writeText("somber")}>somber</button></td>
                    <td className="tough" id="manic"><button onClick={() => writeText("manic")}>manic</button></td>
                    <td className="dark" id="disturbing"><button onClick={() => writeText("disturbing")}>disturbing</button></td>
                    <td className="desert" id="desert"><button onClick={() => writeText("desert")}>desert</button></td>
                </tr>
                <tr>
                    <td className="ballad" id="ballad"><button onClick={() => writeText("ballad")}>ballad</button></td>
                    <td className="positive" id="twee"><button onClick={() => writeText("twee")}>twee</button></td>
                    <td className="adventure" id="adventure"><button onClick={() => writeText("adventure")}>adventure</button></td>
                    <td className="otherworldly" id="surreal"><button onClick={() => writeText("surreal")}>surreal</button></td>
                    <td className="peaceful" id="calm"><button onClick={() => writeText("calm")}>calm</button></td>
                    <td className="sad" id="pessimistic"><button onClick={() => writeText("pessimistic")}>pessimistic</button></td>
                    <td className="tough" id="energetic"><button onClick={() => writeText("energetic")}>energetic</button></td>
                    <td className="dark" id="dark"><button onClick={() => writeText("dark")}>dark</button></td>
                    <td className="green" id="nature"><button onClick={() => writeText("nature")}>nature</button></td>
                </tr>
                <tr>
                    <td className="examination" id="poetic"><button onClick={() => writeText("poetic")}>poetic</button></td>
                    <td className="positive" id="boastful"><button onClick={() => writeText("boastful")}>boastful</button></td>
                    <td className="nostalgic" id="nostalgic"><button onClick={() => writeText("nostalgic")}>nostalgic</button></td>
                    <td className="otherworldly" id="fantasy"><button onClick={() => writeText("fantasy")}>fantasy</button></td>
                    <td className="peaceful" id="sparse"><button onClick={() => writeText("sparse")}>sparse</button></td>
                    <td className="sad" id="sulking"><button onClick={() => writeText("sulking")}>sulking</button></td>
                    <td className="tough" id="energetic 100"><button onClick={() => writeText("energetic 100")}>energetic 100</button></td>
                    <td className="dark" id="anxious"><button onClick={() => writeText("anxious")}>anxious</button></td>
                    <td className="green" id="pastoral"><button onClick={() => writeText("pastoral")}>pastoral</button></td>
                </tr>
                <tr>
                    <td className="examination" id="introspective"><button onClick={() => writeText("introspective")}>introspective</button></td>
                    <td className="positive" id="celebration"><button onClick={() => writeText("celebration")}>celebration</button></td>
                    <td className="love" id="love"><button onClick={() => writeText("love")}>love</button></td>
                    <td className="urban" id="urban"><button onClick={() => writeText("urban")}>urban</button></td>
                    <td className="peaceful" id="soothing"><button onClick={() => writeText("soothing")}>soothing</button></td>
                    <td className="sad" id="lonely"><button onClick={() => writeText("lonely")}>lonely</button></td>
                    <td className="tough" id="fight song"><button onClick={() => writeText("fight song")}>fight song</button></td>
                    <td className="dark" id="crime"><button onClick={() => writeText("crime")}>crime</button></td>
                    <td className="green" id="forest"><button onClick={() => writeText("forest")}>forest</button></td>
                </tr>
                <tr>
                    <td className="conscious" id="conscious"><button onClick={() => writeText("conscious")}>conscious</button></td>
                    <td className="positive" id="sunny day"><button onClick={() => writeText("sunny day")}>sunny day</button></td>
                    <td className="breakup" id="breakup"><button onClick={() => writeText("breakup")}>breakup</button></td>
                    <td className="nocturne" id="night"><button onClick={() => writeText("night")}>night</button></td>
                    <td className="peaceful" id="sedated"><button onClick={() => writeText("sedated")}>sedated</button></td>
                    <td className="cloudy-day" id="cloudy day"><button onClick={() => writeText("cloudy day")}>cloudy day</button></td>
                    <td className="sports" id="sports"><button onClick={() => writeText("sports")}>sports</button></td>
                    <td className="mysterious" id="mysterious"><button onClick={() => writeText("mysterious")}>mysterious</button></td>
                    <td className="green" id="Spring"><button onClick={() => writeText("Spring")}>Spring</button></td>
                </tr>
                <tr>
                    <td className="conscious" id="political"><button onClick={() => writeText("political")}>political</button></td>
                    <td className="fun" id="fun"><button onClick={() => writeText("fun")}>fun</button></td>
                    <td className="LGBT" id="LGBT"><button onClick={() => writeText("LGBT")}>LGBT</button></td>
                    <td className="nocturne" id="urban night"><button onClick={() => writeText("urban night")}>urban night</button></td>
                    <td className="peaceful" id="low energy"><button onClick={() => writeText("low energy")}>low energy</button></td>
                    <td className="rain" id="rainy"><button onClick={() => writeText("rainy")}>rainy</button></td>
                    <td className="heavy" id="heavy"><button onClick={() => writeText("heavy")}>heavy</button></td>
                    <td className="macabre" id="apocalypse"><button onClick={() => writeText("apocalypse")}>apocalypse</button></td>
                    <td className="Summer" id="Summer"><button onClick={() => writeText("Summer")}>Summer</button></td>
                </tr>
                <tr>
                    <td className="conscious" id="protest"><button onClick={() => writeText("protest")}>protest</button></td>
                    <td className="fun" id="quirky"><button onClick={() => writeText("quirky")}>quirky</button></td>
                    <td className="innuendo" id="sensual"><button onClick={() => writeText("sensual")}>sensual</button></td>
                    <td className="late-nocturne" id="late night"><button onClick={() => writeText("late night")}>late night</button></td>
                    <td className="peaceful" id="morning"><button onClick={() => writeText("morning")}>morning</button></td>
                    <td className="rain" id="rain song"><button onClick={() => writeText("rain song")}>rain song</button></td>
                    <td className="heavy" id="noisy"><button onClick={() => writeText("noisy")}>noisy</button></td>
                    <td className="macabre" id="death"><button onClick={() => writeText("death")}>death</button></td>
                    <td className="Autumn" id="Autumn"><button onClick={() => writeText("Autumn")}>Autumn</button></td>
                </tr>
                <tr>
                    <td className="thought" id="philosophical"><button onClick={() => writeText("philosophical")}>philosophical</button></td>
                    <td className="fun" id="humorous"><button onClick={() => writeText("humorous")}>humorous</button></td>
                    <td className="innuendo" id="sexual"><button onClick={() => writeText("sexual")}>sexual</button></td>
                    <td className="late-nocturne" id="starry night"><button onClick={() => writeText("starry night")}>starry night</button></td>
                    <td className="peaceful" id="ECM Style"><button onClick={() => writeText("ECM Style")}>ECM Style</button></td>
                    <td className="storm" id="storm"><button onClick={() => writeText("storm")}>storm</button></td>
                    <td className="heavy" id="dense"><button onClick={() => writeText("dense")}>dense</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="Winter" id="Winter"><button onClick={() => writeText("Winter")}>Winter</button></td>
                </tr>
                <tr>
                    <td className="thought" id="existential"><button onClick={() => writeText("existential")}>existential</button></td>
                    <td className="party" id="party"><button onClick={() => writeText("party")}>party</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="space" id="space"><button onClick={() => writeText("space")}>space</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="heavy" id="hot"><button onClick={() => writeText("hot")}>hot</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="Halloween" id="Halloween"><button onClick={() => writeText("Halloween")}>Halloween</button></td>
                </tr>
                <tr>
                    <td className="thought" id="religious"><button onClick={() => writeText("religious")}>religious</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="mechanical" id="mechanical"><button onClick={() => writeText("mechanical")}>mechanical</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="Christmas" id="Christmas"><button onClick={() => writeText("Christmas")}>Christmas</button></td>
                </tr>
                <tr>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="mechanical" id="futuristic"><button onClick={() => writeText("futuristic")}>futuristic</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                    <td className="blank" id="INC"><button onClick={() => writeText("INC")}>INC</button></td>
                </tr>
            </tbody>
        </table>
    </div>

    {/* Textarea */}
    <textarea
                id="descriptor-area"
                name="descriptor-area"
                onInput={handleTextareaInput}
            ></textarea>

    {/* Buttons */}
    <div className="desc_buttons">
                <button className="copy-all" onClick={copyAll}>Copy All</button>
                <button className="reset" onClick={reset}>Reset</button>
            </div>
    
    <GenreProcessor />

    </div>)
}

export default DescTool
