
        function detectLanguage(text) {
            // Simple heuristic: check if text contains Turkish characters
            const turkishCharacters = /[çğıöşü]/i;
            if (turkishCharacters.test(text)) {
                return 'tr'; // Turkish
            }
            return 'en'; // Default to English
        }

        // Function to trigger speech based on detected language
        function speakText() {

            let speakTextDiv=document.getElementById("ScriptDiv").innerHTML.trim()
            if(speakTextDiv !==""){

                var text = document.getElementById('ScriptDiv').innerText;
                var language = detectLanguage(text);
    
                // Check detected language and set appropriate voice
                if (language === 'tr') {
                    responsiveVoice.speak(text, "Turkish Male", {rate: 0.9});
                } else {
                    responsiveVoice.speak(text, "UK English Male", {rate: 0.9});
                }
            }
            else{
                console.log("vyjvvv")
            }
           
        }

        document.getElementById('Scriptplay').addEventListener('click', function() {
            speakText();
        });
  
