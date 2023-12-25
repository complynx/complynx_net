import { async_sleep, promiseEvent } from "./kmodules/promised_event_target.js";

/**
 * @param {string} el 
 * @param {Element} src 
 * @returns {Array[Element]}
 */
function $(el,src=document){return src.querySelectorAll(el);}
/**
 * @param {Element} el 
 */
function remove(el){
    if(el.parentElement) {
        el.parentElement.removeChild(el);
    }
}

async function about_me(){
    remove($(".initterm")[0]);
    let el = document.createElement("DIV");
    el.classList.add("contents");
    el.innerHTML = /*html*/ `
    <svg style="position: fixed; width: 1px; height: 1px; left: -2px; top: -2px;">
      <defs>
        <filter id="cmd-glitch">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0 0"
                numOctaves="5"
                seed="0"
                result="big_turb"
                in="SourceGraphic"
            />
            <feColorMatrix in="big_turb" type="matrix" result="big_turb_gclean"
                values="1 0 0 0 0
                        0 0 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0"
            />
            <feColorMatrix in="SourceGraphic" type="matrix" result="red"
                values="1 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"
            />
            <feColorMatrix in="SourceGraphic" type="matrix" result="greenblue"
                values="0 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0"
            />
            <feDisplacementMap
                in2="big_turb_gclean"
                xChannelSelector="B"
                yChannelSelector="G"
                in="red"
                result="r-disp"
                scale="3"
            />
            <feDisplacementMap
                in2="big_turb_gclean"
                xChannelSelector="R"
                yChannelSelector="G"
                in="greenblue"
                result="bg-disp"
                scale="3"
            />
            <feBlend mode="lighten" in="r-disp" in2="bg-disp" />
         </filter>
       </defs>
    </svg>
    <div class="instruments">
        <div class="logowrap">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="lynxSvg" viewBox="0 0 150 150">
                <path transform="translate(-4,18) scale(0.18)"
                    d="M 425.31931,28.287168 C 387.32958,37.992473 313.23479,63.977151 313.23479,63.977151 l 4.03352,10.460525 c 0,0 69.72283,-26.793103 105.24547,-38.262374 27.27085,-8.805 82.71947,-23.420861 82.71947,-23.420861 0,0 -53.62187,8.815846 -79.91394,15.532727 z M 628.60208,57.69702 C 583.03109,64.455215 492.47124,81.569381 492.47124,81.569381 l 5.19135,9.921567 c 0,0 88.24659,-18.193959 132.39901,-27.148137 28.73711,-5.82793 86.24883,-17.297821 86.24883,-17.297821 0,0 -58.57602,6.331695 -87.70835,10.65203 z m -249.64606,9.963188 c -20.6875,5.143648 -61.36367,18.010183 -61.36367,18.010183 l 3.34855,9.772683 c 0,0 36.48757,-13.760185 55.00452,-19.847852 26.11367,-8.585178 79.04709,-23.499321 79.04709,-23.499321 0,0 -50.92986,9.321905 -76.03649,15.564307 z M 251.47839,99.64448 c -16.98473,12.48235 -32.88121,26.75685 -46.5341,42.81576 -13.18712,15.51106 -33.58425,51.01507 -33.58425,51.01507 0,0 24.75114,-34.90703 39.70469,-50.08011 13.34946,-13.54544 28.67915,-25.08398 44.18665,-36.09328 16.76297,-11.900609 52.58441,-32.225389 52.58441,-32.225389 0,0 6.00704,11.729474 7.85878,18.013309 2.2837,7.74967 3.90359,23.92102 3.90359,23.92102 0,0 -13.50349,23.91881 -20.7841,35.55834 -5.38917,8.61568 -16.93588,25.35021 -16.93588,25.35021 0,0 15.05762,-16.25586 21.54201,-25.20627 8.38088,-11.56814 22.28121,-36.60735 22.28121,-36.60735 0,0 -1.24019,-17.748469 -3.28646,-26.36527 -2.1064,-8.870013 -9.18015,-25.763369 -9.18015,-25.763369 0,0 -42.60093,21.589673 -61.7564,35.667329 z m 146.30301,18.8205 c -27.24626,14.10287 -53.3742,30.91387 -76.79937,50.72575 -26.54681,22.45201 -71.13387,76.28502 -71.13387,76.28502 0,0 50.12252,-49.58929 78.14183,-70.81665 22.39192,-16.96406 46.43685,-31.88315 71.38478,-44.79741 28.31311,-14.65625 88.28343,-36.79643 88.28343,-36.79643 0,0 10.09322,17.63711 12.81677,27.32056 2.51536,8.94325 3.05145,27.7032 3.05145,27.7032 0,0 -23.44077,38.46804 -36.80249,56.5636 -10.54011,14.27431 -34.09898,40.87675 -34.09898,40.87675 0,0 27.2686,-24.26222 39.12247,-38.06636 15.2934,-17.80956 40.91848,-57.3175 40.91848,-57.3175 0,0 -0.54783,-20.99327 -3.26441,-31.034 -3.58521,-13.25125 -16.93025,-37.542129 -16.93025,-37.542129 0,0 -64.60624,21.324099 -94.68984,36.895599 z M 590.91571,87.774693 c -30.35991,3.969081 -90.53806,15.497167 -90.53806,15.497167 l 6.68716,8.87766 c 0,0 55.62504,-11.54205 83.50559,-16.971149 25.68419,-5.001408 77.17277,-14.373238 77.17277,-14.373238 0,0 -51.33012,3.636184 -76.82746,6.96956 z M 206.30016,194.50083 c -23.31149,5.67574 -46.90114,12.55241 -67.63254,24.6292 -7.29893,4.25189 -14.13725,9.74114 -19.28826,16.43592 -20.723516,26.93442 -44.027938,91.95588 -44.027938,91.95588 0,0 -29.471268,24.68222 -40.41661,40.22072 -2.126654,3.01909 -4.190264,6.37019 -4.71406,10.02576 -0.424464,2.96233 0.62326,5.97627 1.38496,8.8703 2.871046,10.90835 6.238342,21.92531 11.91563,31.67228 4.058717,6.96815 15.49258,18.5805 15.49258,18.5805 0,0 5.002372,-8.15198 5.85507,-12.75042 3.382854,-18.24311 -3.54799,-55.54911 -3.54799,-55.54911 0,0 -0.331065,20.61451 -1.958626,30.75831 -1.01874,6.34931 -4.858624,18.66971 -4.858624,18.66971 0,0 -5.378527,-7.04509 -7.064589,-11.09117 -3.665263,-8.79562 -6.308451,-27.88149 -6.308451,-27.88149 0,0 1.940374,-5.62332 3.661904,-7.99622 10.516854,-14.49612 39.495341,-36.42516 39.495341,-36.42516 0,0 21.224443,-66.14963 41.677773,-93.44046 4.762,-6.35392 11.36958,-11.29902 18.15717,-15.41941 19.53218,-11.85698 41.60051,-19.27711 63.47529,-25.87926 24.88335,-7.51019 76.4354,-15.42355 76.4354,-15.42355 0,0 -52.34872,3.85716 -77.73343,10.03767 z m 309.48716,24.85714 C 502.0013,212.5147 472.64913,202.89415 472.64913,202.89415 l -4.85026,6.93689 c 0,0 29.6347,8.73185 43.78871,14.82586 11.12514,4.78993 21.82798,10.60557 32.11862,16.99422 13.61094,8.44997 38.98996,28.10197 38.98996,28.10197 0,0 -24.19383,-22.33804 -37.44595,-32.0494 -9.3318,-6.83849 -19.10013,-13.20173 -29.46289,-18.34572 z m 72.94373,114.31695 c 0.62669,28.0927 0.3688,56.26599 -1.83546,84.27909 -1.51217,19.21753 -7.79923,57.30245 -7.79923,57.30245 0,0 -10.97354,-9.52408 -16.99569,-13.55412 -5.15279,-3.44826 -16.26693,-9.02012 -16.26693,-9.02012 l -0.8919,11.2116 c 0,0 9.16569,3.90676 13.11054,6.86999 11.15624,8.38017 28.98826,30.19739 28.98826,30.19739 0,0 9.2907,-54.79223 10.831,-82.47819 1.63357,-29.36246 1.46208,-58.97101 -1.71301,-88.20698 -2.11115,-19.43922 -11.478,-57.52666 -11.478,-57.52666 0,0 3.59649,40.57727 4.05042,60.92555 z M 230.86964,292.34663 c -14.22126,0.5761 -28.46196,1.79388 -42.49399,4.17676 -10.84922,1.84238 -22.14526,3.06372 -32.07953,7.79766 -2.3849,1.13647 -4.39173,2.98045 -6.30486,4.80232 -6.53022,6.2187 -12.11668,13.40391 -17.4236,20.6945 -4.36309,5.99396 -11.78851,18.86021 -11.78851,18.86021 0,0 11.88633,-12.56465 17.99609,-18.68359 4.9901,-4.9976 9.60064,-10.46644 15.23759,-14.72106 2.38084,-1.797 4.9727,-3.38071 7.74376,-4.48472 8.77027,-3.49415 18.29593,-4.70368 27.55461,-6.54852 13.98323,-2.78623 28.10288,-4.87155 42.22778,-6.81602 12.84673,-1.76851 38.65302,-4.40899 38.65302,-4.40899 0,0 -26.22376,-1.19917 -39.32236,-0.66855 z m -63.57761,20.68867 c 0,0 -6.0865,7.71663 -7.67032,12.27368 -1.28299,3.69148 -1.2921,11.65282 -1.2921,11.65282 0,0 13.55485,-4.31275 19.52476,-8.04133 8.03649,-5.01929 21.25972,-18.86876 21.25972,-18.86876 0,0 -12.68319,7.39964 -19.12258,10.92459 -4.48577,2.45553 -13.58911,7.12053 -13.58911,7.12053 0,0 1.53795,-4.41139 1.7127,-6.71465 0.21151,-2.78778 -0.82307,-8.34688 -0.82307,-8.34688 z m 224.24704,133.18436 c -3.73245,7.55715 -10.66433,22.92699 -10.66433,22.92699 0,0 -35.88097,6.38931 -53.75916,9.91067 -23.88484,4.70445 -47.84099,9.1589 -71.47747,14.9842 -37.90877,9.34275 -75.99858,18.60631 -112.67601,31.99017 -6.47715,2.36356 -18.86034,8.49393 -18.86034,8.49393 0,0 -4.59403,-5.44621 -6.51482,-8.43476 -3.51181,-5.46399 -6.26876,-11.38544 -9.08108,-17.24025 -3.41025,-7.0996 -9.43569,-21.66276 -9.43569,-21.66276 0,0 32.96482,-11.58959 49.05473,-18.37105 20.08421,-8.46495 59.17372,-27.81634 59.17372,-27.81634 0,0 -43.22582,14.08522 -64.79879,21.24889 -16.5609,5.49933 -49.620681,16.68361 -49.620681,16.68361 0,0 -13.007057,-11.40926 -18.548627,-18.00882 -4.941467,-5.88489 -12.95567,-19.06832 -12.95567,-19.06832 0,0 5.353083,16.50289 9.314045,24.17754 3.612564,6.9996 7.862728,13.77321 13.052565,19.69863 1.618015,1.84735 5.55155,4.84316 5.55155,4.84316 0,0 6.614361,14.6901 10.380528,21.80454 3.39457,6.41248 6.70068,12.93699 10.99269,18.78692 3.64985,4.97469 12.43378,13.71211 12.43378,13.71211 0,0 10.95085,-6.25891 16.81554,-8.51101 38.55153,-14.80421 79.37107,-22.97114 119.57247,-32.41739 22.7516,-5.34602 45.75067,-9.6142 68.76,-13.71129 20.64752,-3.67654 62.15671,-9.75069 62.15671,-9.75069 0,0 5.96635,-22.5918 9.28734,-33.7912 4.07978,-13.7583 13.06443,-41.0212 13.06443,-41.0212 0,0 -14.46279,26.86752 -21.21743,40.54372 z m 146.59865,33.10675 c -6.62634,35.98936 -15.64329,71.68332 -27.74038,106.2203 -7.62223,21.76135 -28.10287,63.20698 -28.10287,63.20698 0,0 -3.80185,-8.75029 -5.98935,-12.98543 -3.61174,-6.99257 -7.35719,-13.95011 -11.75995,-20.47364 -5.44076,-8.06154 -18.02676,-22.94229 -18.02676,-22.94229 l -9.23307,3.93166 c 0,0 13.7339,14.87365 19.56605,23.11235 4.68831,6.62287 8.82392,13.67533 12.29607,21.00927 5.19449,10.97194 12.65265,34.14976 12.65265,34.14976 0,0 27.59953,-51.13336 37.00298,-78.48584 12.4669,-36.26337 20.2859,-74.20611 25.29619,-112.2239 4.09223,-31.05165 3.79148,-93.8839 3.79148,-93.8839 0,0 -4.32708,59.89492 -9.75304,89.36468 z M 233.86643,509.8566 c 0,0 19.90982,40.49726 27.39793,61.72663 7.29162,20.67226 12.89953,41.99772 16.93554,63.5435 4.01439,21.43038 7.17329,65.01485 7.17329,65.01485 0,0 40.25655,-12.93549 58.6138,-23.14693 31.51022,-17.52793 61.77539,-38.58509 86.81765,-64.52747 17.33433,-17.9574 42.51701,-61.63465 42.51701,-61.63465 0,0 -29.21417,40.84044 -47.61836,57.64761 -25.40224,23.19798 -55.18985,41.41868 -85.1907,58.25226 -14.01104,7.86165 -43.95187,19.78049 -43.95187,19.78049 0,0 -4.40968,-37.2132 -8.2697,-55.52233 -4.41505,-20.94178 -9.83358,-41.747 -16.98398,-61.91933 -7.51901,-21.21227 -27.13458,-61.82375 -27.13458,-61.82375 z"
                    class="lynx"/>
            </svg>
        </div>
        <div class="theme-toggler"><span class="dark">dark</span><span class="light">light</span></div>
    </div>
    <div class="about">
        <span class="ascii-name">
            <span class="small">
                <div class="a28 name">&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;_&nbsp;_&nbsp;&nbsp;_&nbsp;&nbsp;___&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;<br>|&nbsp;.&nbsp;\\|&nbsp;.&nbsp;||&nbsp;\\&nbsp;||&nbsp;||&nbsp;__]|&nbsp;|&nbsp;&nbsp;<br>|&nbsp;|&nbsp;||&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;||&nbsp;||&nbsp;_]&nbsp;|&nbsp;|_&nbsp;<br>|___/|_|_||_\\_||_||___]|___|</div>
                <div class="a33 sname">&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;_&nbsp;&nbsp;____&nbsp;_&nbsp;_&nbsp;&nbsp;_&nbsp;_&nbsp;&nbsp;_&nbsp;__<br />|&nbsp;.&nbsp;\\|&nbsp;.&nbsp;\\|&nbsp;||_&nbsp;&nbsp;/|&nbsp;|&nbsp;||&nbsp;|&nbsp;||&nbsp;/&nbsp;/<br />|&nbsp;|&nbsp;||&nbsp;&nbsp;&nbsp;/|&nbsp;|&nbsp;/&nbsp;/&nbsp;|&nbsp;&nbsp;&nbsp;||&nbsp;|&nbsp;||&nbsp;&nbsp;\\&nbsp;<br />|___/|_\\_\\|_|/___||_|_|&nbsp;\\__||_\\_\\</div>
            </span>
        </span>
        <div class="job-name"><span class="main">lead developer</span> <span class="brace">(</span><span class="additional">golang</span>, <span class="additional">js</span>, <span class="additional">python</span>, <span class="ellipsis">...</span><span class="brace">)</span></div>
        <div class="job-name"><span class="main">dancer DJ</span> <span class="brace">(</span><span class="additional">brazilian zouk</span><span class="brace">)</span></div>
        <div class="contacts">
            <span class="title">find_me on</span> <span class="brace">{</span>
            <a href="https://t.me/complynx" title="Telegram: @complynx" target="_blank"><span class="icon">&#xF2C6;</span><span class="username">@complynx</span> <span class="site">Telegram</span></a>
            <a href="https://fb.me/complynx" title="Facebook: complynx" target="_blank"><span class="icon">&#xf230;</span><span class="username">@complynx</span> <span class="site">Facebook</span></a>
            <a href="https://www.instagram.com/complynx/" title="Instagram: @complynx" target="_blank"><span class="icon">&#xF16D;</span><span class="username">@complynx</span> <span class="site">Instagram</span></a>
            <a href="https://www.linkedin.com/in/complynx" title="LinkedIn: complynx" target="_blank"><span class="icon">&#xf30c;</span><span class="username">@complynx</span> <span class="site">LinkedIn</span></a>
            <a href="https://github.com/complynx" title="GitHub: complynx" target="_blank"><span class="icon">&#xe804;</span><span class="username">@complynx</span> <span class="site">GitHub</span></a>
            <a href="https://vk.me/complynx" title="VK: complynx" target="_blank"><span class="icon">&#xe802;</span><span class="username">@complynx</span> <span class="site">VK</span></a>
            <a href="https://www.mixcloud.com/dj_touchz/" title="My sets on MixCloud" target="_blank"><span class="icon">&#xF289;</span><span class="username">dj_touchz</span> <span class="site">MixCloud</span></a>
            <br><a href="mailto:d.drizhuk@gmail.com" title="E-mail" target="_blank"><span class="icon">&#xe801;</span><span class="username">d.drizhuk@gmail.com</span> <span class="site">e-mail</span></a>
            <span class="brace">}</span>
        </div>
    </div>
    <div class="joke">&nbsp;</div>
    `;

    let ws;
    async function getJoke() {
        if(ws && ws.receivingJoke) return;
        el = $(".joke")[0];
        el.innerText="█";
        function finishedJoke(){
            if(!ws.receivingJoke) return;
            ws.receivingJoke = false;
            el.innerText = el.innerText.substring(0, el.innerText.length-1);
        }
        function ws_message(ev) {
            let msg = JSON.parse(ev.data);
            if(msg.chunk) {
                el.innerText = el.innerText.substring(0, el.innerText.length-1) + msg.chunk + "█";
            }
            if(msg.finished) {
                finishedJoke();
            }
        }
        function ws_close(ev) {
            finishedJoke();
            ws = null;
        }
        if(!ws) {
            let loc = window.location, ws_uri;
            if (loc.protocol === "https:") {
                ws_uri = "wss:";
            } else {
                ws_uri = "ws:";
            }
            ws_uri += "//" + loc.host;
            ws_uri += "/abouter/ws";

            ws = new WebSocket(ws_uri);
            
            ws.addEventListener("message", ws_message);
            ws.addEventListener("close",ws_close);
            ws.addEventListener("error",ws_close);
            await promiseEvent(ws, "open");
        }
        ws.receivingJoke = true;
        ws.send("get");
    }
    {
        let fills = [];
        function recursiveCollectFills(element) {
            element.normalize();
            for(let node of element.childNodes){
                if(node.nodeType == node.TEXT_NODE) {
                    fills.push({
                        node: node,
                        text: node.textContent
                    });
                    node.textContent = "";
                }
                if(node.nodeType == node.ELEMENT_NODE) {
                    recursiveCollectFills(node);
                }
            }
        }
        recursiveCollectFills($(".about", el)[0]);
        const delay = 10;
        function fillTheFillsBack(){
            if(fills.length) {
                let fill = fills[0];
                if(fill.text.length) {
                    let added_part = "";
                    do{
                        added_part += fill.text[0];
                        fill.text = fill.text.substring(1);
                    }while(added_part.match(/\s$/) && fill.text.length);

                    fill.node.textContent = fill.node.textContent.substring(0,fill.node.textContent.length-1) + added_part + "█";
                } else {
                    fills.shift();
                    fill.node.textContent = fill.node.textContent.substring(0,fill.node.textContent.length-1);
                    if(fills[0]) fills[0].node.textContent += "█";
                }
                setTimeout(fillTheFillsBack, delay);
            } else {
                getJoke();
            }
        }
        fillTheFillsBack();
    }
    document.body.appendChild(el);

    function randomizeGlitch() {
        let r = ()=>Math.random();
        let glitchDuration = Math.pow(r(), 2)*1000 + 20;
        let glitchAmplitude = r()*0.2 + 0.001;
        let glitchSeed = Math.floor(r()*1000);
        let nextGlitch = Math.pow(r(), 4)*5000 + 50;
        let T = $("#cmd-glitch feTurbulence")[0];
        T.baseFrequencyY.baseVal = glitchAmplitude;
        T.seed.baseVal = glitchSeed;
        setTimeout(()=>{
            T.baseFrequencyY.baseVal = 0;
            setTimeout(randomizeGlitch, nextGlitch);
        }, glitchDuration);
    }
    randomizeGlitch();

    {
        function chooseToggler(){
            if(localStorage["theme"] == "light"){
                $(".theme-toggler")[0].classList.add("light");
                $(".theme-toggler")[0].classList.remove("dark");
            }else{
                $(".theme-toggler")[0].classList.remove("light");
                $(".theme-toggler")[0].classList.add("dark");
            }
        }
        $(".theme-toggler")[0].addEventListener("click", function() {
            toggleTheme();
            chooseToggler();
        });
        chooseToggler();
    }
}
Promise.all([
    async_sleep(100)
]).then(()=>about_me()).then(console.log,console.error);
