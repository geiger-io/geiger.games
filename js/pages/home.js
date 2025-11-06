// Home Page
export class HomePage {
    async render() {
        return `
            <div id="index" class="container-strip">
                <section class="container" id="intro">
                    <h1 id="statement">Hello there adventurer! <br/>What's your name?</h1>
                    <br/>
                    <span id="hint">Hint: Start typing, Submit</span>
                    <br/>
                    <br/>
                    <img id="geiger-logo" src="img/geiger-logo-large.png" alt="geiger-logo-large" />
                    <form id="text-form">
                        <label for="text-input" class="visuallyhidden">Enter your name</label>
                        <input type="text" id="text-input" name="name" aria-label="Enter your name" aria-describedby="hint" placeholder="Joe Bloggs" autocomplete="name">
                        <button class="button" type="submit">Submit</button>
                    </form>
                </section>
            </div>
        `;
    }

    attachEventListeners() {
        const textForm = document.getElementById('text-form');
        const textInput = document.getElementById('text-input');
        const statement = document.getElementById('statement');
        const hint = document.getElementById('hint');
        
        if (!textForm || !textInput) return;

        let progress = 0;
        textInput.focus();

        // Load bad words
        let badwords = '';
        fetch('badwords.txt')
            .then(response => response.text())
            .then(txt => {
                badwords = txt;
            })
            .catch(() => {
                badwords = '';
            });

        textForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = textInput.value;
            const val = name.toLowerCase();
            
            const statement2 = `Hi <span class='highlight'>${name}</span> what are you interested in? `;
            const hint2 = "Hint: Digital Books, Apps, Crowdfunding, Contact";
            const hint3 = "At this point the page will re-direct to relevant page";
            
            const statementbooks = "Books eh? Follow the white rabbit!";
            const statementweb = "A tangled web, untangled, let me show you.";
            const statementnews = "Extra! Extra! Read all about it!";
            const statementapp = "Do we like apps? App-solutely!";
            const statementcontact = "Hey, I just met you, And this is crazy, But here's my number, So call me, maybe!";
            const statementnoidea = "I haven't a clue what you are talking about. Are you sure you are writing English?";
            
            const bwrds = [
                "Language!",
                "Wash your mouth out with soup! ...er... I mean soap. Stupid auto-complete.",
                "Merry Christmas you filthy animal!",
                "Such ugly words, from such pretty hands, tut tut.",
                "Do you kiss your mother with that mouth?",
                "How rude! Won't someone please think of the children!"
            ];
            
            const noidea = [
                "I haven't a clue what you are talking about. Are you sure you are writing English?",
                "Que?",
                "You are beyond the realm of comprehension!",
                "Um, nope, try again.",
                "I'm sorry but I don't have an answer for that.",
                "This is not the answer you were looking for. Please try again.",
                "Is this some kind of joke? That didn't make sense."
            ];
            
            progress++;
            textForm.reset();
            
            if (progress === 1) {
                statement.innerHTML = statement2;
                hint.innerHTML = hint2;
            } else if (progress >= 2) {
                hint.innerHTML = hint3;
                
                if (val.match(/(book|digital books|ebooks|epub|ibooks|kindle)/)) {
                    this.textSwap(statement, statementbooks);
                    setTimeout(() => window.app.router.navigate('/books'), 1500);
                } else if (val.match(/(web|website|web site|interwebs|internet|kickstarter|crowdfunding|pledgemanager|pledges|mantic|pledgehammer)/)) {
                    this.textSwap(statement, statementweb);
                    setTimeout(() => window.app.router.navigate('/web'), 2000);
                } else if (val.match(/(app|apps|application|applications|webapp|webapps|ios|iphone|ipad|i phone|i pad|android|apptastic)/)) {
                    this.textSwap(statement, statementapp);
                    setTimeout(() => window.app.router.navigate('/apps'), 2000);
                } else if (val.match(/(contact|email|telephone|address)/)) {
                    this.textSwap(statement, statementcontact);
                    setTimeout(() => window.app.router.navigate('/contact'), 2500);
                } else if (val.match(/(news|press|pr|blog|articles)/)) {
                    this.textSwap(statement, statementnews);
                    setTimeout(() => window.app.router.navigate('/news'), 2500);
                } else if (badwords && val.match(new RegExp(badwords, 'i'))) {
                    const text = bwrds[Math.floor(Math.random() * bwrds.length)];
                    this.textSwap(statement, text);
                } else {
                    const text = noidea[Math.floor(Math.random() * noidea.length)];
                    this.textSwap(statement, text);
                    hint.innerHTML = hint2;
                }
            }
        });
    }

    textSwap(element, statement) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.innerHTML = statement;
            element.style.opacity = '1';
        }, 100);
    }
}

