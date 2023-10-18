
// remove the error class on answer update
var question_selects = document.querySelectorAll("select");
question_selects.forEach(function(el){
    el.addEventListener("change", function(){
        el.parentElement.parentElement.classList.remove("error_question");
       el.onchange();
    });
});

function updateProgress(target){
        targetEl = document.getElementById(target); 
      
        //count the errors and hold the accordion open while there are some ... need to remove error_question class on update answer.
        var error_count = targetEl.querySelectorAll(".error_question");
        if(error_count.length > 0) {
            // stop the rest of the process to hold the accordion open ...
           
            return;
        }

        var section_questions = targetEl.querySelectorAll('select, input');
        var complete = true;
        section_questions.forEach(function(element){
            if( element.value == "Unanswered" || element.value === "" ) {
                complete = false;
            }
        });
        if(complete){
            
            if(sections[target] == 'incomplete'){
                //newly completed -> so update the progress and hide the section
                sections[target] = 'complete';
                
                var bsCollapse = new bootstrap.Collapse(targetEl,{
                    toggle: false,
                }); 
                bsCollapse.hide();
                
                if(isLocked){
                    console.log('isLocked - adding completed');
                    targetEl.previousElementSibling.firstElementChild.classList.add("completed");
                } else {
                    console.log('not locked - adding completed-pending');
                    targetEl.previousElementSibling.firstElementChild.classList.add("completed-pending");
                }
                
                var progress = document.getElementById('progressBar');
                var now = parseInt(progress.getAttribute('aria-valuenow'));
                var newProgress = now+=10;
                progress.setAttribute('aria-valuenow', newProgress);
                progress.style.width = now + "%";
                progress.innerHTML = (newProgress)/10+"/10";
                
                offset = '85';
                window.scroll(0, targetEl.offsetTop - offset);
                
            } else { //re-opened and edited ... still needs closing.
               
                var bsCollapse = new bootstrap.Collapse(targetEl,{
                    toggle: false,
                }); 
                bsCollapse.hide();
                                
                if(target == "form-accordion-fire-body"){
                    offset = '85';
                    window.scroll(0, targetEl.offsetTop - offset);
                }
            }
            

        } else {
            if(sections[target] == 'complete'){
                //section has been uncompleted -> go back a step.
                
                var bsCollapse = new bootstrap.Collapse(targetEl,{
                    toggle: false,
                }); 
                bsCollapse.show(); //pin it open
                
                sections[target] = 'incomplete';
                targetEl.previousElementSibling.firstElementChild.classList.remove("completed, completed-pending");
                var progress = document.getElementById('progressBar');
                var now = parseInt(progress.getAttribute('aria-valuenow'));
                var newProgress = now-=10;
                progress.setAttribute('aria-valuenow', newProgress);
                progress.style.width = now + "%";
                progress.innerHTML = (newProgress)/10+"/10";    
            }
        }
    }

    
        const sectionbodies = document.querySelectorAll('.accordion-body');
        const sections = [];
        
        sectionbodies.forEach(function(element){
            var key = element.parentElement.id
            sections[key] = 'incomplete';
        });
        
        window.addEventListener('load',function(){
            for (const [key, value] of Object.entries(sections)) {
                updateProgress(key)
            }
        });
    
        //Question 24 hides Q25
        if( document.getElementById('Q24') !== null ){
            window.addEventListener('load',function(){updateForm('Q24','No',['Q25'] )});
            document.getElementById('Q24').addEventListener('change',function(){updateForm('Q24','No',['Q25'] )});
        }

        
        //Question 36 hides Q37
        if( document.getElementById('Q36') !== null ){
            window.addEventListener('load',function(){updateForm('Q36','No',['Q37'] )});
            document.getElementById('Q36').addEventListener('change',function(){updateForm('Q36','No',['Q37'] )});
        }

        //Question 62 hides Q64, Q66, Q68, Q69 **NEW**
        if( document.getElementById('Q62') !== null ){
            window.addEventListener('load',function(){updateForm('Q62','No',['Q64','Q66','Q68','Q69'] )});
            document.getElementById('Q62').addEventListener('change',function(){updateForm('Q62','No',['Q64','Q66','Q68','Q69'] )});
        }
        
        //Question 70 hides Q71 .. Q85
        if( document.getElementById('Q70') !== null ){
            window.addEventListener('load',function(){updateForm('Q70','0',['Q71','Q72','Q73','Q74','Q75','Q76','Q77','Q78','Q79','Q80','Q81','Q82','Q83','Q84','Q85'] )});
            document.getElementById('Q70').addEventListener('change',function(){updateForm('Q70','0',['Q71','Q72','Q73','Q74','Q75','Q76','Q77','Q78','Q79','Q80','Q81','Q82','Q83','Q84','Q85'] )});
        }
        
        //Question 99 hides Q100 **NEW**
        if( document.getElementById('Q99') !== null ){
            window.addEventListener('load',function(){updateForm('Q99','No',['Q100'] )});
            document.getElementById('Q99').addEventListener('change',function(){updateForm('Q99','No',['Q100'] )});
        }

        //Question 102 hides Q103 .. Q108 **Newly extended - to what is (and was) in the comment ... ?? Concerned the NA will break on 103 + 105.
        if( document.getElementById('Q102') !== null ){
            window.addEventListener('load',function(){updateForm('Q102','No',['Q103','Q104','Q105','Q106','Q107','Q108'] )});
            document.getElementById('Q102').addEventListener('change',function(){updateForm('Q102','No',['Q103','Q104','Q105','Q106','Q107','Q108'] )});
        }
        
        //Question 111 hides Q112 .. Q114
        if( document.getElementById('Q111') !== null ){
            window.addEventListener('load',function(){updateForm('Q111','No',['Q112','Q113','Q114'] )});
            document.getElementById('Q111').addEventListener('change',function(){updateForm('Q111','No',['Q112','Q113','Q114'] )});
        }


        //Question 107 hides 130
        if( document.getElementById('Q107') !== null ){
            window.addEventListener('load',function(){updateFormShow('Q107','Yes',['Q130'] )});
            document.getElementById('Q107').addEventListener('change',function(){updateFormShow('Q107','Yes',['Q130'] )});
        }

        //Question 107 hides 130
        if( document.getElementById('Q131') !== null ){
            window.addEventListener('load',function(){updateFormShow('Q131','Yes',['Q132'] )});
            document.getElementById('Q131').addEventListener('change',function(){updateFormShow('Q131','Yes',['Q132'] )});
        }
        
        //take a question number and answer -> hide an array of questions
        function updateForm(trigger,answer,targets){
            var current_question_element = document.getElementById(trigger);
            var current_answer;

            //if type is input
            if(current_question_element.tagName =="INPUT"){
                current_answer = current_question_element.value;
            }
            //if type is select
            if(current_question_element.tagName =="SELECT"){
                current_answer = current_question_element.options[current_question_element.selectedIndex].getAttribute('data-response');
            }
            
            if(current_answer == answer){ //Hide questions and remove answers
            
                targets.filter( element => document.getElementById(element) !== null ).forEach(function(element){ //remove targets not in this form
                
                    var hiddenEl = document.getElementById(element).closest(".row, .my-3");  // get the question row - parent to all Q elements

                    var hiddenInput = hiddenEl.querySelectorAll('input');
                    hiddenInput.forEach(function(){
                        
                        //treat 103, 105 & 108 differently, they should be 0 not N/A
                        if(element == 'Q103' || element == 'Q105'|| element == 'Q108' ){ 
                            console.log("setting " + element + " value to 0");
                            document.getElementById(element).value="0";
                        } else {
                            element => element.value="N/A";
                        }
                    });

                    var hiddenSelect = hiddenEl.querySelectorAll('select');
                    hiddenSelect.forEach(function(element){
                       for (var i = 0; i < element.options.length; i++) {
                            var dr = element.options[i].getAttribute('data-response');

                            if(dr == "N/A") {

                                element.value = element.options[i].value;
                                element.options[i].selected = 'selected'; //select NA so we can fold the section when completed
            
                            }
                        }

                    });
                hiddenEl.style.display="none";       
                updateProgress(document.getElementById(element).closest(".accordion-collapse").id); //update the progress bar
            
                });
                
            } else {// not interested in hiding it, make sure it is showing and reset answers
                
                console.log(targets);

                targets.filter( element => document.getElementById(element) !== null ).forEach(function(element){ //Show questions and mark as unanswered
                    var hiddenEl = document.getElementById(element).closest(".row, .my-3");
                    hiddenEl.style.display="block";

                    console.log("element "+element); //element is the id like Q111
                    console.log("hiddenEl "+hiddenEl); //hiddenEl is the div element
                    
                    var hiddenEls = hiddenEl.querySelectorAll('select, input');
                 
                        hiddenEls.forEach(function(element){

                            console.log("looking at element id "+element.id);
                            
                            if(!isLocked){ // only clean the answers to the unhidden questions if the form is still being completed
                            
                                if(document.getElementById("A"+element.value) !== null){
                                    console.log("answer not null");
                                    
                                    if(element.value == "131"){ //answer id of 131 (Q37 N/a)
                                        // skip this one, N/A is used differently
                                        console.log("answer is 131");

                                    } else if((element.id == "Q103" || element.id == "Q105" || element.id == "Q108")  ){ // && document.getElementById(element.id).value == 0
                                        console.log("setting " + element + " value to blank");
                                        //if its these particular questions and the answer is 0 - reset it.
                                        document.getElementById(element).value="";
                                        
                                    }  else if(document.getElementById("A"+element.value).getAttribute('data-response') == "N/A"){
                                        element.value="Unanswered";
                                        console.log("Answer updated");
                                    } else{ 
                                        console.log("No conditions satisfied, answer is "+document.getElementById("A"+element.value).getAttribute('data-response'));
                                    }
                                }
                            }
                            
                        });
       
                //   updateProgress(document.getElementById(element).closest(".accordion-collapse").id); //update the progress bar
                });
                //end of filtered loop of hide/show - now try updateProgress ...
                updateProgress(document.getElementById(element).closest(".accordion-collapse").id); //update the progress bar
            }
        }



                //take a question number and answer -> show an array of questions
                function updateFormShow(trigger,answer,targets){
                    var current_question_element = document.getElementById(trigger);
                    var current_answer;
        
                    //if type is input
                    if(current_question_element.tagName =="INPUT"){
                        current_answer = current_question_element.value;
                    }
                    //if type is select
                    if(current_question_element.tagName =="SELECT"){
                        current_answer = current_question_element.options[current_question_element.selectedIndex].getAttribute('data-response');
                    }
                    
                    if(current_answer !== answer){ //Hide questions and remove answers
                        //console.log("not my answer ... ");
                        targets.filter( element => document.getElementById(element) !== null ).forEach(function(element){ //remove targets not in this form
                        
                            var hiddenEl = document.getElementById(element).closest(".row, .my-3");  // get the question row - parent to all Q elements
        
                            var hiddenInput = hiddenEl.querySelectorAll('input');
                            hiddenInput.forEach(element => element.value="N/A");
                            
                            //treat 103 and 105 and 108 differently  //TEST THIS
                            if(element == 'Q103' || element == 'Q105' || element == 'Q108'){
                                document.getElementById(element).value="";
                            }

                            var hiddenSelect = hiddenEl.querySelectorAll('select');
                            hiddenSelect.forEach(function(element){
                               for (var i = 0; i < element.options.length; i++) {
                                    var dr = element.options[i].getAttribute('data-response');
        
                                    if(dr == "N/A") {
        
                                        element.value = element.options[i].value;
                                        element.options[i].selected = 'selected'; //select NA so we can fold the section when completed
                    
                                    }
                                }
        
                            });
                        hiddenEl.style.display="none";       
                        updateProgress(document.getElementById(element).closest(".accordion-collapse").id); //update the progress bar
                    
                        });
                        
                    } else {
                        //console.log("this is my answer ... ");
                        targets.filter( element => document.getElementById(element) !== null ).forEach(function(element){ //Show questions and mark as unanswered
                            var hiddenEl = document.getElementById(element).closest(".row, .my-3");
                            hiddenEl.style.display="block";
                            
                            var hiddenEls = hiddenEl.querySelectorAll('select, input');
                         
                                hiddenEls.forEach(function(element){
                                    
                                    if(!isLocked){ // only clean the answers to the unhidden questions if the form is still being completed
                                    
                                        if(document.getElementById("A"+element.value) !== null){
                                            
                                            if(element.value == "131"){ 
                                                // skip this one, N/A is used differently
                                                
                                            } else if(element == "Q103" || element == "Q105" || element == "Q108" ){ //TEST THIS - and add comments for future
                                                document.getElementById(element).value = "";

                                            } else if(document.getElementById("A"+element.value).getAttribute('data-response') == "N/A"){
                                                element.value="Unanswered";
                                               
                                            }
                                        }
                                    }
                                    
                                });
               
                            updateProgress(document.getElementById(element).closest(".accordion-collapse").id); //update the progress bar
                        });
                    }
                }

        
        function deleteFile(file_name){
            $.ajax({
                url: 'https://audit.ski-api-technologies.com/remove-file/'+file_name,
                type: 'POST',
                data: {
                
                },
                success: function(msg) {
                    console.log(msg);
                    document.getElementById(file_name).remove();
                    
                }               
            });
      }
        
        function formValidation(){
        
        sectionbodies.forEach(function(section){
            var questions = section.querySelectorAll('input, select');
            questions.forEach(function(question){
                if(question.value == "" || question.value == "Unanswered") { 
                    question.style.backgroundColor="rgb(255 0 0 / 21%)";

                    //add event listener to remove bg color on change
                    question.addEventListener('change',function(question){
                        var current_question = question.target;
                        if(current_question.value == "" || current_question.value == "Unanswered") { 
                            current_question.style.backgroundColor="rgb(255 0 0 / 21%)";
                        } else {
                            current_question.style.backgroundColor="#fff";
                        }
                    });
                }  
            });
        });
    }
        
        
