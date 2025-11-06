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

        // Load bad words - make it a promise so we can wait for it
        const badwordsPromise = fetch('/badwords.txt')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load badwords');
                return response.text();
            })
            .then(txt => {
                return txt.trim(); // Trim whitespace and return
            })
            .catch((error) => {
                console.warn('Could not load badwords.txt:', error);
                return '';
            });

        textForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Wait for badwords to load before processing
            const badwords = await badwordsPromise;
            
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
            
            // Check for bad words FIRST (before any other processing)
            // This check must happen before progress is incremented
            if (badwords && badwords.length > 0) {
                try {
                    // badwords.txt is pipe-separated, use it directly as regex pattern
                    const regex = new RegExp(badwords, 'i');
                    const isBadWord = regex.test(val);
                    if (isBadWord) {
                        const text = bwrds[Math.floor(Math.random() * bwrds.length)];
                        this.textSwap(statement, text);
                        // Reset hint appropriately - don't say it will redirect
                        if (progress === 0) {
                            // First input (name) - keep original hint
                            hint.innerHTML = "Hint: Start typing, Submit";
                        } else {
                            // Second input (interest) - reset to interest hint
                            hint.innerHTML = hint2;
                        }
                        textForm.reset();
                        return; // Don't increment progress if bad word detected
                    }
                } catch (error) {
                    console.warn('Error checking bad words:', error);
                    // Fall through if regex fails
                }
            }
            
            // Only increment progress if we get past the bad words check
            progress++;
            textForm.reset();
            
            if (progress === 1) {
                statement.innerHTML = statement2;
                hint.innerHTML = hint2;
            } else if (progress >= 2) {
                if (val.match(/(book|digital books|ebooks|epub|ibooks|kindle)/)) {
                    hint.innerHTML = hint3;
                    this.textSwap(statement, statementbooks);
                    setTimeout(() => window.app.router.navigate('/books'), 1500);
                } else if (val.match(/(web|website|web site|interwebs|internet|kickstarter|crowdfunding|pledgemanager|pledges|mantic|pledgehammer)/)) {
                    hint.innerHTML = hint3;
                    this.textSwap(statement, statementweb);
                    setTimeout(() => window.app.router.navigate('/web'), 2000);
                } else if (val.match(/(app|apps|application|applications|webapp|webapps|ios|iphone|ipad|i phone|i pad|android|apptastic)/)) {
                    hint.innerHTML = hint3;
                    this.textSwap(statement, statementapp);
                    setTimeout(() => window.app.router.navigate('/apps'), 2000);
                } else if (val.match(/(contact|email|telephone|address)/)) {
                    hint.innerHTML = hint3;
                    this.textSwap(statement, statementcontact);
                    setTimeout(() => window.app.router.navigate('/contact'), 2500);
                } else if (val.match(/(news|press|pr|blog|articles)/)) {
                    hint.innerHTML = hint3;
                    this.textSwap(statement, statementnews);
                    setTimeout(() => window.app.router.navigate('/news'), 2500);
                } else {
                    // No match found - show "no idea" response
                    const text = noidea[Math.floor(Math.random() * noidea.length)];
                    this.textSwap(statement, text);
                    hint.innerHTML = hint2; // Reset hint, don't say it will redirect
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

