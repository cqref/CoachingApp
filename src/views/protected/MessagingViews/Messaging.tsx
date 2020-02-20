// View where Messaging Components are composed to make the final view
import React, { useState, useRef } from 'react';
import sgMail from '@sendgrid/mail'; 
import ChooseIntent from '../../../components/MesssagingComponents/ChooseIntent';
import EmailBody from '../../../components/MesssagingComponents/EmailBody';
import RecipientAddress from '../../../components/MesssagingComponents/RecipientAddress';
import SubmitButton from '../../../components/MesssagingComponents/SubmitButton';
import AppBar from '../../../components/AppBar.js'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'; 

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
  TODO:
    - choose intent on left and email above
    - alert if one of them not done
    - fix the icons
    - better way of storing the emails
    - incorporating the styled email templates
    - changing the bottom part of the email doesn't make it refresh
    - sent successfully or failed popup
    - interface with firebase get the current user's email id
    - selectOption is one value older
    - write tests
*/

const gridContainer = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: 'auto 15% 1fr',
	gridGap: '0.2em',
};

const appbar = {
		gridColumn: '1 / span 4',
		gridRow: '1',		
};
const intentClass = {
		gridRow: '2 / span 3',
		gridColumn: '1',
};
const recipient = {
		gridColumn: '2 / span 4',
		gridRow: '2 / 2', 
};
const emailbody = {
		gridRow: '3 / span 4',
		gridColumn: '2 / span 4',
};

const submit = {
    position: 'fixed',
    bottom: '4em',
    right: '1em',
};

const MessagingView: React.FC<MessagingViewProps> = () => {
    const [intent, setIntent] = useState("Thank You");
    const textRef = useRef();
    const [selectedOption, setSelectedOption] = useState(null);
    const sendMailButton = () => {
 	const msg = {
		to: selectedOption.value,
		from: 'meprovidence@gmail.com',
  		subject: intent,
  		text: textRef.current.textContent,
		html: textRef.current.innerHTML,
	};
	console.log(selectedOption.value + ' - ' + intent + ' ~ ' + textRef.current.innerHTML + ' ` ' + sgMail.send(msg));
    };

    const thankYou: JSX.Element = <div style={{padding: "5em"}}>
    <h4>Hi Mingli,</h4>
    Thanks for meeting today and creating this action plan. I think it looks great, and I look forward to working on these goals with you!
    <br />
    Please reach out with questions or ideas anytime.
    <br />
    <br />
    Best,
    <br />
    <br />
    Katherine
    </div>;

    const custom: JSX.Element = <div style={{padding: "5em"}}>
    <h4>Hi Andrew,</h4>
    Wololo!
    <br />
    Please reach out with questions or ideas anytime.
    <br />
    <br />
    Best,
    <br />
    <br />
    Katherine
    </div>;

    const feedback: JSX.Element = <div style={{padding: "5em"}}>
    <h4>Hi Jason,</h4>
    Thanks for telling me in advance. All the best for the career fair!
    <br />
    Please reach out with questions or ideas anytime.
    <br />
    <br />
    Best,
    <br />
    <br />
    Katherine
    </div>;
 
    const actionPlan: JSX.Element = <div style={{padding: "5em"}}>
    <h4>Hi Baibhav,</h4>
    Thanks for sending the action plan! I will reply after checking it out.
    <br />
    Please reach out with questions or ideas anytime.
    <br />
    <br />
    Best,
    <br />
    <br />
    Katherine
    </div>;   

    const getEmailText = () => {
			if(intent === "Thank You") {
				return thankYou;
			} else if (intent === "Action Plan"){
				return actionPlan;
			} else if (intent === "New Message") {
				return custom;
			} else if (intent === "Feedback") {
				return feedback;
			} else {
				return <h1>lmao</h1>;
			}
		};
    return (
        <div style={gridContainer}>
	    <div style={appbar}>
	    <FirebaseContext.Consumer>
	    	{firebase => <AppBar firebase={firebase} />}
	    </FirebaseContext.Consumer>
	    </div>
            <div style={intentClass}>
              <ChooseIntent changeIntent={setIntent}/>
            </div>
              <div style={recipient}>
	      	<FirebaseContext.Consumer>
			{firebase => <RecipientAddress selectedOption={selectedOption} setOption={setSelectedOption} firebase={firebase}/>}
		</FirebaseContext.Consumer>
              </div>
              <div style={emailbody}>
		      <EmailBody emailText={getEmailText()} emailTextRef={textRef} />
              </div>
              <div style={submit}>
                <SubmitButton sendMail={sendMailButton}/>
              </div>
        </div>
    );
}

export default MessagingView;
