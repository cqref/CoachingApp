 // ----- Schema -----
 // {
 //  'type':            transition type
 //    [                  array of questions
 //      {                  each question
 //       'text': string,     raw question text
 //       'options': Map        multiple choices
 //          [                    maps choice to correctness
 //            [ string: bool ]     true for correct choice, false o/w
 //          ],
 //        'feedback': string   feedback
 //      },
 //      ... more questions
 //    ],
 //   ... rest of types
 // }

const questionBank = {
  'transition':[
    {
      text: "What are the potential benefits of reducing transition time?",
      options: new Map([
        ["More time spent learning", false],
        ["Less bad behavior", false],
        ["Lower engagement in learning", false],
        ["A and B only", true],
        ["A, B, and C", false]
      ]),
      feedback: "The correct answer is D. When children spend time in transition, " +
        "there is automatically less time available for learning activities. " +
        "Moreover, when children are in transition, they are less engaged and " +
        "more likely to exhibit problematic behaviors that require behavior management."
    },
    {
      text: "Some transitions are necessary during the school day.",
      options: new Map([
        ["True", true],
        ["False", false]
      ]),
      feedback: "The correct answer is True. Students must have some transition time in " +
        "order to switch from one activity to the next and engage in appropriate routines " +
        "such as hand washing. However, research indicates that reducing transition time " +
        "as much as possible leads to more positive child outcomes."
    },
    {
      text: "How do you know when a transition has ended?",
      options: new Map([
        ["The teacher starts singing a song with a child that has finished washing their hands",
        false],
        ["Children are not talking", false],
        ["The majority of children are engaged in an activity", true],
        ["The majority of children are sitting quietly", false]
      ]),
      feedback: "The correct answer is C. A transition has ended when the majority " +
        "of students are engaged in an activity. It is possible for students to be " +
        "sitting quietly while also being in transition if they are waiting on the " +
        "teacher or materials to begin an activity. Moreover, if a few students are " +
        "in between activities but the rest are participating in an activity, that " +
        "does not count as a transition. Likewise, if a few students have finished " +
        "washing hands or using the restroom and the teacher starts an activity with " +
        "them, the transition does not end until a majority of the students are " +
        "involved in the activity."
    },
    {
      text: "Children are walking from their classroom to the cafeteria for lunch. " +
        "The reason for this transition is:",
      options: new Map([
        ["Classroom routines", false],
        ["Behavior management interruption", false],
        ["Traveling outside the classroom", true],
        ["Other", false]
      ]),
      feedback: "The correct answer is C. When children need to get from their " +
        "classroom to another part of the school or to the playground, " +
        "the reason for their transition is traveling outside the classroom."
    },
    {
      text: "Which of the following is not considered a transition?",
      options: new Map([
        ["Two students are washing their hands while others are waiting on the carpet", false],
        ["Students line up to go the gym", false],
        ["Children raise their hands to answer a teacher's question during book reading", true],
        ["Students are cleaning up after center time / free choice", false]
      ]),
      feedback: "The correct answer is C. if children are raising their hands during book " +
        "reading, they are participating in a learning activity. Students lining up, " +
        "washing hands, waiting on the carpet, and cleaning up after center time are all " +
        "examples of transition time."
    },
    {
      text: "Ten of the 20 students in Ms. Sunshine's class are lining up and the other ten " +
        "students are still engaged in centers. Is this a transition?",
      options: new Map([
        ["Yes, because the class is leaving center time.", false],
        ["No, because he number of students lining up is not yet the majority fo the class.",
        true],
        ["Yes, because the majority of class is not engaged in a learning activity.", false],
        ["More information is needed.", false]
      ]),
      feedback: "The correct answer is B. Once the majority of the students are lining up, then " +
        "it would be considered a transition and you would start the timer in the CQ-Ref tool. " +
        "This example is not considered transition because the students were in centers first " +
        "and less than a majority have lined up. Once 11 students are no longer in centers and " +
        "are lining up, the transition would begin."
    },
    {
      text: "If children are cleaning up materials after an activity in the classroom, " +
        "how would you categorize the reason for that transition?",
      options: new Map([
        ["Classroom routines", true],
        ["Children waiting on teacher or materials", false],
        ["Traveling outside the classroom", false],
        ["Other", false]
      ]),
      feedback: "The correct answer is A. Cleaning up between activities is a regular part " +
        "of the school day and thus would be considered a classroom routine transition."
    },
    {
      text: "The teacher leaves the carpet during a whole group activity to search for a " +
        "read-aloud book in the closet. Is this a transition?",
      options: new Map([
        ["Yes", true],
        ["No", false]
      ]),
      feedback: "The correct answer is Yes. If children are waiting on the teacher or " +
        "materials, they are not engaged in a learning activity."
    },
    {
      text: "If children line up to go to the playground and then the teacher as to take " +
        "a few minutes to prepare materials, first the observer would select ____ and " +
        "then ____ as the reasons for the transition.",
      options: new Map([
        ["Lining up/waiting in line; Classroom routines", false],
        ["Classroom routines; Children waiting on teacher or materials", false],
        ["Children waiting on teacher or materials; Lining up/waiting in line", false],
        ["Lining up/waiting in line; Children waiting on teacher or materials", true]
      ]),
      feedback: "The correct answer is D. Both lining up and waiting on the teacher or " +
        "materials are reasons that children experience transitions. In the above scenario, " +
        "the children first line up and then they have to continue waiting because the " +
        "teacher is preparing materials."
    },
    {
      text: "Which of the following is associated with having high transition time?",
      options: new Map([
        ["Fewer behavior management problems", false],
        ["Less instructional time", true],
        ["More child-directed play", false],
        ["Higher student engagement", false]
      ]),
      feedback: "The correct answer is B. When children spend time in transition, there is " +
        "automatically less time available to engage in learning activities. Students tend to " +
        "exhibit more problem behaviors and lower engagement when they are in transitions."
    }
  ],
  'climate':[
    {
      text: "Experiencing a positive classroom climate is associated with greater _______.",
      options: new Map([
        ["Student engagement in learning", true],
        ["Behavior disapproving", false],
        ["Unoccupied time", false],
        ["Free time", false],
      ]),
      feedback: "The correct answer is A.  When students experience a positive classroom climate, " + 
      "they feel comfortable and are more likely to be engaged in learning activities."
    },
    {
      text: "Which of the following is NOT a component of classroom climate?",
      options: new Map([
        ["General approval", false],
        ["Specific praise", false],
        ["Redirection", false],
        ["Whole Group ", true],
      ]),
      feedback: "The correct answer is D.  Whole group is a common classroom activity, but " + 
      "classroom climate exists regardless of the activity type.  Climate is determined by a " + 
      "combination of the teacher’s tone and the amount of general approvals, specific praise, " + 
      "redirection, and behavior disapprovals that children receive."
    },
    {
      text: "Joey and Sandra are playing a board game.  The teacher comments, " + 
      "“I like the way you two are taking turns!”  This is an example of:",
      options: new Map([
        ["General approval", false],
        ["Specific praise", true],
        ["Redirection", false],
        ["Neutral affect", false],
      ]),
      feedback: "The correct answer is B.  By giving a positive comment which includes details " + 
      "about what the students are saying or doing, the teacher is using specific praise."
    },
    {
      text: "A student is running around the classroom instead of lining up with the other " + 
      "students.  If the teacher says, “Stop that!” it would be considered a _____; whereas " + 
      "if the teacher says, “Sam, get in line with the other students” it is a _____.",
      options: new Map([
        ["Redirection; behavior disapproval", false],
        ["Behavior disapproval; general approval", false],
        ["Behavior disapproval; redirection", true],
        ["Negative tone; behavior disapproval", false],
      ]),
      feedback: "The correct answer is C.  When a teacher tells a child to stop what they " + 
      "are doing without giving an option of what they should do instead, it is a behavior " + 
      "disapproval.  If what they tell the child to do is different from what they are " + 
      "currently doing, it is a redirection."
    },
    {
      text: "The teacher is expressing ______ if she smiles, nods, and conveys curiosity about " + 
      "what a child is doing.",
      options: new Map([
        ["Flat affect", false],
        ["Neutral affect", false],
        ["Preferential treatment", false],
        ["Positive interest", true],
      ]),
      feedback: "The correct answer is D.  When teachers show that they are engaged in what " + 
      "a child is doing or saying, they are showing positive interest."
    },
    {
      text: "The teacher shows a high level of enthusiasm when she smiles and claps as her " + 
      "students sing a song for her.  Her tone would be considered ___.",
      options: new Map([
        ["Positive interest", false],
        ["Excitement", true],
        ["Neutral", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is B.  The teacher’s behaviors indicate genuine enthusiasm " + 
      "for her students, so her tone is excitement."
    },
    {
      text: "Students are talking over the teacher as she is trying to read a book to them. " + 
      "An example of a redirection is if she ____.",
      options: new Map([
        ["Stops reading until they quiet down", false],
        ["Keeps reading, but louder", false],
        ["Says, “It’s time to listen now so that you can hear the story.”", true],
        ["Puts them all in time out", false],
      ]),
      feedback: "The correct answer is C.  The teacher redirects students toward a different behavior."
    },
    {
      text: "Although ___ is considered to be positive, ___ is more effective and will give " + 
      "children a better understanding of which behaviors benefit them and their peers.",
      options: new Map([
        ["General approval; specific praise", true],
        ["Specific praise; overall approval", false],
        ["General approval; positive affect", false],
        ["Specific praise; positive affect", false],
      ]),
      feedback: "The correct answer is A.  Behavioral feedback that is specific to what the " + 
      "child is doing or the effort they are putting in is more beneficial than general praise."
    },
    {
      text: "When children internalize the schedule and routines of the classroom, fewer ___ will be needed.",
      options: new Map([
        ["Redirections", true],
        ["Open-ended questions", false],
        ["Activities", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is A.  If children internalize the schedule and routines of " + 
      "the classroom, they know what to expect and what actions to take, so teachers do not need " + 
      "to spend as much time correcting behavior."
    },
    {
      text: "Using behavior disapprovals improves children’s self regulation.",
      options: new Map([
        ["True", false],
        ["False", true],
      ]),
      feedback: "The correct answer is false.  Positive classroom climates are associated with " + 
      "better self regulation for students, but behavior disapprovals do not contribute to a " + 
      "positive classroom climate."
    }
  ],
  'math':[
    {
      text: "A teacher observes a child in dramatic play placing toy eggs in a basket. " +
      "She says, “Wow, Jaden, you have a big basket of eggs! How many do you have?” " + 
      "Which of the following behaviors did the teacher use?",
      options: new Map([
        ["Asking questions about math concepts", true],
        ["Demonstrating math concepts", false],
        ["Using math vocabulary", false],
        ["A and B only", false]     
       ]),
      feedback: "The correct answer is A. When a teacher asks, “How many do you have?” " +
      "that is considered asking questions about math concepts because it prompts the " +
      "child to use counting skills such as one-to-one correspondence or subitizing."
    },
    {
      text: "A child is playing with blocks and begins to put all the green triangles into " +
      "a pile and the red triangles into a separate pile. What type of math is this child doing?",
      options: new Map([
        ["Measurement and data", false ],
        ["Patterns", false],
        ["Shapes and spatial reasoning", false],
        ["None of the above", true]
      ]),
      feedback: "The correct answer is D. The child is sorting the triangles by color; " +
      "therefore the child is not doing one of the math types listed in the answers. " +
      "If the child had sorted the blocks by shape, placing those with three sides (triangles) " +
      "in one pile and those with four sides (squares) in a separate pile, then the correct type "+
      "of math would be shapes and spatial reasoning."
    },
    {
      text: "Which of the following is NOT an example of the math type counting and number?",
      options: new Map([
        ["Matching a card showing three dots with a card showing the numeral 3",false],
        ["Making a pattern with magnet numbers (1,2,1,2)", true],
        ["Counting all of the letter A’s on a book page", false],        
        ["Singing a counting song like 'Five Little Monkeys'", false]
      ]),
      feedback: "The correct answer is B. Making a pattern with magnet numbers (1,2,1,2) is an "+
      "example of patterning (not counting and number). Whenever a child repeats a sequence of items, "+
      "the child is creating a pattern."
    },
    {
      text: "A child is putting beans on one side of a bucket balance and marbles on the other side. "+
      "The bucket with marbles sinks and the bucket with beans rises. If the child ________________, "+
      "this would be an example of the math type measurement and data.",
      options: new Map([
        ["Counts the beans", false],
        ["Says there are more marbles than beans", false],
        ["Says the marbles are heavier", true],
        ["All of the above", false]
      ]),
      feedback: "The correct answer is C. One way that children engage in the math type measurement "+
      "and data is by comparing objects by weight. The child does this when she observes that the "+
      "marbles in the bucket balance are heavier."
    },
    {
      text: "A child is exploring letter stamps at the writing center. At first he tries out the "+
      "A, C, and S stamps. Then he starts alternating the A and S stamp across the bottom of the "+
      "paper. What type of math is he doing?",
      options: new Map([
        ["Patterns", true],
        ["Shapes and spatial reasoning", false],
        ["Counting and number", false],
        ["Measurement and data", false]
      ]),
      feedback: "The correct answer is A. When children repeat a sequence like A, S, A, S they "+
      "are creating a pattern."
    },
    {
      text: "A teacher is introducing measurement concepts to a small group of children using blocks "+
      "to determine the length of a table. She lines blocks from one edge of the table to the other. "+
      "When she reaches the end of the table, she says, “Hmm, it looks like the table is 16 blocks long "+
      "plus part of a block. So it is more than 16 blocks but less than 17 blocks.” In this scenario, "+
      "the teacher is_______________.?",
      options: new Map([
        ["Demonstrating a math concept", false],
        ["Asking questions about a math concept", false ],
        ["Demonstrating a math concept and using math vocabulary", true],
        ["Asking questions about a math concept and using math vocabulary", false]
      ]),
      feedback: "The correct answer is C. The teacher models, or demonstrates, how to use blocks "+
      "(a non-standard unit of measurement) to figure out the length of the table. In addition, the "+
      "teacher uses math vocabulary including “long”, “more”, and “less” as she demonstrates the "+
      "measurement concepts."
    },
    {
      text: "A teacher reads a book about a bear who picks seven apples every Sunday, then eats one "+
      "per day until he has none left. One child says, “On the next page, he’s going to have four "+
      "left!” This child is showing what type of mathematical thinking?",
      options: new Map([
        ["Measurement and data", false ],
        ["Counting and number", true],       
        ["Shapes and spatial reasoning", false],
        ["All the above", false ]
      ]),
      feedback: "The correct answer is B. The child notices that each time the bear eats an apple, "+
      "it is one less than the amount the bear had before. When the child predicts that the bear " +
      "will have four on the next page, the child shows his knowledge that counting backward is one "+
      "less.",
    },
    {
      text: "A teacher watches a child at the art center play with a handful of pipe cleaners. "+
      "She encourages the child to create something and he builds a house. The teacher asks, "+
      "“What shapes do you see in your house?” The child replies, “It’s just a house!” "+
      "The teacher is ______________; the child is doing this type of math: _______________.",
      options: new Map([
        ["Using math vocabulary; measurement and data",false],
        ["Asking questions about math concepts; shapes and spatial reasoning", false],
        ["Using math vocabulary; shapes and spatial reasoning", false],
        ["Asking questions about math concepts; none", true]
      ]),
      feedback: "The correct answer is D. The teacher is asking questions about math concepts when "+
      "she asks the child about shapes. However, the child does not show that she is thinking about "+
      "a particular math concept when she replies, “It’s just a house!” Therefore, there is no math "+
      "type to identify regarding the child’s behavior."
    },
    {
      text: "A child in the music center listens to a peer create a rhythm on the hand drums "+
      "(one beat slow, three beats fast, ba-da-da-da). The child copies the rhythm (ba-da-da-da) "+
      "with his hands over and over again. This is an example of ________________.",
      options: new Map([
        ["Patterns", true],
        ["Counting and number", false],
        ["Measurement and data", false ],
        ["Shapes and spatial reasoning", false],
      ]),
      feedback: "The correct answer is A. When children create a pattern in their environment, "+
      "whether it is using blocks to make a red-blue-red-blue pattern or hand-clapping to repeat "+
      "a series of beats, this is doing patterns."
    },
    {
      text: "Two children at the blocks center have each connected several train cars together "+
      "to make one long line of trains. One boy says, “Mine is the longest!” The teacher joins their "+
      "play and says, “How do you know your train is longer than Leo’s train? Let’s find out how long "+
      "they are.” The boys eagerly start pointing to their trains one by one and saying, “one, two, "+
      "three, four,” etc. What type(s) of math are the children doing?",
      options: new Map([
        ["Counting and number", false],
        ["Patterns; counting and number", false],
        ["Measurement and data; counting and number", true],
        ["Patterns", false],
      ]),
      feedback: "The correct answer is C. When children compare objects by length to figure "+
      "which is the longest (or longer, shorter, etc.), they are doing measurement and data "+
      "math. Because the boys counted their trains to help them compare lengths, they are "+
      "also engaged in the counting and number type of math."
    }
  ],
  'student':
      [
        {
          text: " Student engagement refers to which of the following: " ,
          options: new Map([
              ["The number of times a student correctly answers teacher questions", false],
              ["The extent to which a student is interested in learning activities", false],
              ["How involved a student is in learning activities", false],
              ["B and C", true],
            ]),
          feedback: "The correct answer is D. Engagement in learning refers to one’s degree of interest, attention, " +
              "curiosity, motivation, or passion related to a learning task."
        },
        {
          text: "  Engagement in learning refers to a student’s degree of _________ related to a learning task. " ,
          options: new Map([
            ["Attention", false],
            ["Motivation", false],
            ["Curiosity", false],
            ["All of the Above", true],
          ]),
          feedback: "The correct answer is D. A student’s engagement level refers to how invested and interested he " +
              "or she is in learning activities or tasks."
        },


        {
          text: " Indicators of off task behavior include: " ,
          options: new Map([
            ["Sitting with materials but staring into space", false],
            ["Challenging behavior like singing loudly during a read aloud", false],
            ["Looking at what other children are doing with little interest", false],
            ["All of the above", true],
          ]),
          feedback: "The correct answer is D. “Off task” behavior refers to the lowest level of engagement in learning" +
              " tasks. Depending on the situation, low engagement may look like engaging in challenging behavior," +
              " a slouched body position, lack of persistence, flat affect, or staring into space."
        },


        {
          text: " Children who are rated as showing high engagement might be: " ,
          options: new Map([
            ["Concentrating and seriously pursuing an activity", true],
            ["Showing some signs of distraction during an activity", false],
            ["Wandering around the classroom to look at different materials", false],
            ["Having a lively, off-topic conversation with a peer while the teacher gives a lesson.", false],
          ]),
          feedback: "The correct answer is A. Highly engaged students do not show signs of distraction and are often " +
              "oblivious to noise and behaviors of other children. They also show persistence and intense concentration" +
              " during learning tasks or lessons. D is incorrect because the children’s conversation, while engaging, " +
              "is off-topic; however, if the conversation were on topic it could be showing high engagement."
        },


        {
          text: " A student at the sand and water table begins to excitedly fill up a bucket with sand, " +
              "then walks over to look at a peer’s new sticker. His level of engagement would be: " ,
          options: new Map([
            ["Off Task", false],
            ["Mildly Engaged", true],
            ["Engaged", false],
            ["Highly Engaged", false],
          ]),
          feedback: "The correct answer is B. Mildly engaged students are often inconsistent in their concentration" +
              " and attention. They tend to seem interested in the activity, but could also " +
              "easily give it up for another activity. "
        },


        {
          text: " When a child volunteers responses, shows an eager expression, or persistently looks at " +
              "learning materials, her level of engagement would be characterized as: " ,
          options: new Map([
            ["Off Task", false],
            ["Mildly Engaged", false],
            ["Engaged", true],
            ["Highly Engaged", false],
          ]),
          feedback: "The correct answer is C. Students who demonstrate engaged behaviors are focused" +
              " and interested in learning tasks. High engagement is characterized by intense focus " +
              "and concentration on learning tasks, even around distracting noises or behaviors. "
        },


        {
          text: " If a student was sitting on the carpet playing with her shoelaces while" +
              " the teacher read a book, her level of engagement would be: " ,
          options: new Map([
            ["Off Task", true],
            ["Mildly Engaged", false],
            ["Engaged", false],
            ["Highly Engaged", false],
          ]),
          feedback: "The correct answer is A. When students exhibit very low interest in " +
              "learning tasks, we refer to this level of engagement as “off task.” " +
              "If the student in this example played with her shoelace for a few seconds, " +
              "and then returned her attention to the read aloud, she would exhibit mild engagement, " +
              "which is characterized by inconsistent attention. "
        },


        {
          text: " A student in the blocks center is building a house. He seems oblivious to his peers next" +
              " to him who are crashing cars and speaking very loudly. His level of engagement is: " ,
          options: new Map([
            ["Off Task", false],
            ["Mildly Engaged", false],
            ["Engaged", false],
            ["Highly Engaged", true],
          ]),
          feedback: "The correct answer is D. This student demonstrates a high level of engagement" +
              " because he is not distracted by his noisy peers and instead remains intensely focused" +
              " on building a structure. "
        },


        {
          text: " Which of the following best characterizes a mildly engaged student? " ,
          options: new Map([
            ["Consistently pays attention while the teacher demonstrates an activity", false],
            ["Looks at what other children are doing with little interest", false],
            ["Looks up now and then to see what others are doing, but then returns to the activity", true],
            ["Seems oblivious to noise and the behaviors of other children", false],
          ]),
          feedback: "The correct answer is C. Mildly engaged students do not show deep interest in learning " +
              "activities. Instead, they pay attention inconsistently and are easily distracted" +
              " from the task at hand."
        },


        {
          text: " Students who are engaged in learning tasks look  _______ at the teacher and learning materials;" +
              " whereas students who are mildly engaged are _________ interested in the teacher’s" +
              " instruction and learning materials. " ,
          options: new Map([
            ["attentively; consistently", false],
            ["consistently; inconsistently", true],
            ["attentively; always", false],
            ["inconsistently; consistently", false],
          ]),
          feedback: "The correct answer is B. Students who are solidly engaged in learning activities or " +
              "lessons are not easily distracted and are consistently attentive. In contrast," +
              " mildly engaged students’ attention wanders"
        },
      ],
  'level':[
    {
      text: "Level of instruction depends on the ________ of interactions between children " +
        "and teachers and the amount of ________ required for children to participate." ,
      options: new Map([
        ["quality; letter knowledge", false],
        ["quality; academic knowledge", false],
        ["richness; abstract thought", true],
        ["richness; self-regulation", false],
      ]),
      feedback: "The correct answer is C. Level of instruction refers to the amount of inference, " + 
        "or high-level thinking, required for children to participate in an interaction with a teacher " +
        "or peers. Level of instruction does not depend on the type of academic content being discussed."
    },
    {
      text: "Children who are interacting with teachers during low-level instruction may do " +
        "all of the following EXCEPT:",
      options: new Map([
        ["Identify letters", false],
        ["Answer high-level questions", true],
        ["Answer low-level questions", false],
        ["Select the correct answer from a set of choices", false],
      ]),
      feedback: "The correct answer is B. Low-level instruction occurs when teachers ask questions " + 
        "with predetermined answers, with the goal of having children learn or recite the correct " +
        "response."
    },
    {
      text: "Which of the following is an example of a high-level question?",
      options: new Map([
        ["Show me the number 5.", false],
        ["Which picture has a triangle in it?", false],
        ["How did you figure that out?", true],
        ["How many will you have if I take 2 away?", false],
      ]),
      feedback: "The correct answer is C. High-level questions do not have predetermined answers. " + 
        "Instead, they require children to draw on reasoning skills as they think about how to respond."
    },
    {
      text: "A teacher holds up four triangles and asks, \"How many triangles do we have now?\" " +
        "Which of the following child responses would you record in the tool?",
      options: new Map([
        ["Five!", false],
        ["I don't know!", false],
        ["Four!", false],
        ["All of the above", true],
      ]),
      feedback: "The correct answer is D. In the tool, all child answers are counted. If three " + 
        "children provide answers, all three are counted, even when answers are incorrect."
    },
    {
      text: "The goal of improving level of instruction is to:",
      options: new Map([
        ["Ask only high-level questions", false],
        ["Ask zero low-level questions", false],
        ["Ask more high-level questions and fewer low-level questions", true],
        ["Ask more high-level and more low-level questions", false],
      ]),
      feedback: "The correct answer is C. Some low-level instruction is necessary in preschool, " + 
        "especially because low-level questions often help dual language learners and children with " +
        "language delays enter conversations. However, the goal for improving level of instruction " +
        "is to ask fewer low-level questions overall and ask more high-level questions that " +
        "have more than one possible answer and require abstract thought."
    },
    {
      text: "Level of instruction refers to:",
      options: new Map([
        [
          "The amount of inference, or abstract thought, required for children to participate " +
          "in teacher-child interactions.", 
          true
        ],
        ["The number of conversational turns in teacher-child interactions about academic content.", false],
        ["The amount of time teachers spend on academic content across the day.", false],
        ["The number of correct answers children give in response to teacher questions.", false],
      ]),
      feedback: "The correct answer is A. Level of instruction does not refer to the number " + 
        "of instructional interactions a teacher has with children throughout the day. Instead, level " +
        "of instruction captures the degree to which children engage in deep thinking, such as drawing " +
        "on past experiences or explaining their thinking, when interacting with teachers and peers " +
        "about content."
    },
    {
      text: "A teacher places three cards on the table with images of a snake, a slide, and " +
        "a dog. The teacher asks, \"Which picture starts with /s/?\" This is an example of a " +
        "high-level question.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. Although this question does not have a single " + 
        "predetermined correct answer (there are two possible correct answers), the teacher " +
        "presents a set of choices for the children to consider. Therefore, this question is " +
        "low-level."
    },
    {
      text: "All of the following are examples of high-level questions EXCEPT:",
      options: new Map([
        ["Asking children to explain their thought process", false],
        ["Asking children to identify the correct answer from a set of choices", true],
        ["Asking children to connect academic content with their personal experience", false],
        ["Asking children to make a prediction based on context clues or prior knowledge", false],
      ]),
      feedback: "The correct answer is B. High-level questions do not have one correct answer. " + 
        "Instead, high-level questions have more than one possible answer and require children to " +
        "draw from experiences, background knowledge, and context clues to come up with a response."
    },
    {
      text: "A teacher is discussing the concepts of sinking and floating at the water table " +
        "with a small group of children. As the teacher drops a rock into the water, she says, " +
        "\"I wonder what will happen to this rock when I put it in the water--let's find out.\" " +
        "What kind of question is this?",
      options: new Map([
        ["High-level question", false],
        ["Would not be counted as a question", true],
        ["Low-level question", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is B. When teachers ask questions without providing children " + 
        "an opportunity to respond, the questions are not counted. If the teacher had asked, " +
        "\"I wonder what will happen to this rock when I put it in the water,\" and " +
        "encouraged children to explain their thinking, it would have been a high-level question.",
    },
    {
      text: "While some low-level instruction is necessary in preschool, research shows that children " +
        "in classrooms with more high-level instruction do better academically and show improved " +
        "self-regulation.",
      options: new Map([
        ["True", true],
        ["False", false],
      ]),
      feedback: "The correct answer is True. Some low-level instruction is necessary in preschool. " + 
        "However, research shows that young minds also thrive when they have opportunities to think more " +
        "deeply. The goal for improving level of instruction is to provide more of these important " +
        "opportunities to answer high-level questions and engage in conversations that last more than " +
        "two turns."
    },
  ],
  'listening':[
    {
      text: "The Listening to Children practice refers to two important behaviors " +
        "that contribute to a high-quality ________ environment: the amount of " +
        "teacher listening to children and the amount of ________ talk.",
      options: new Map([
        ["academic; teacher", false],
        ["language; teacher", false],
        ["language; child", true],
        ["indoor; child", false]
      ]),
      feedback: "The correct answer is C. The practice of Listening to Children " +
        "refers to two important indicators of a high-quality language environment--" +
        "teachers listening to children and children talking."
    },
    {
      text: "Which of the following is NOT one of the teacher behaviors tracked " +
        "by the observation tool that encourages child talk?",
      options: new Map([
        ["Teaching in small groups", true],
        ["Looking expectantly at children and showing warmth", false],
        ["Asking open-ended questions", false],
        ["Positioning oneself at eye level with children", false]
      ]),
      feedback: "The correct answer is A. Small group instruction might encourage " +
        "child talk if the teacher limited her own contributions and asked " +
        "effective questions. However, teaching in small groups does not automatically " +
        "encourage child talk; the amount of child talk in small groups depends on " +
        "the teacher's skill in fostering child participation."
    },
    {
      text: "Which of the following is an example of an open-ended question to " +
        "encourage child talk?",
      options: new Map([
        ["Tell me what that letter is.", false],
        ["What might happen to Corduroy if Lisa doesn't come back?", true],
        ["How many do you have?", false],
        ["Do we need a square or a rectangle to continue our pattern?", false]
      ]),
      feedback: "The correct answer is B. Open-ended questions or statements invite " +
        "children to respond with longer sentences because there is not one correct " +
        "answer. In this example, children must use their imagination, background " +
        "knowledge, and clues from the text ot produce a unique answer."
    },
    {
      text: "Teachers play an important role in encouraging children to talk to " +
        "each other. Which of the following is NOT an example of promoting peer talk?",
      options: new Map([
        ["Helping children use role speech or talk in character with each other " +
          "during dramatic play", false],
        ["Asking children to talk to their neighbor about a character during a read aloud", false],
        ["Encouraging two children to talk about their building at the blocks center", false],
        ["Asking two children to pass out glues for an art project", true]
      ]),
      feedback: "The correct answer is D. All of the answers except for D are examples " +
        "of promoting peer talk. In contrast, asking children to pass out materials " +
        "might result in one child saying, 'Here,' or 'Glue for you,' but the children " +
        "are not likely to have a multi-turn conversation about a learning activity."
    },
    {
      text: "Listening and ________ children helps teachers expand on children's play " +
        "or talk during an activity. This can increase children's involvement level " +
        "and lead to more child ________.",
      options: new Map([
        ["assessing; talk", false],
        ["assessing; listening", false],
        ["observing; talk", true],
        ["observing; listening", false]
      ]),
      feedback: "The correct answer is C. When teachers take the time to notice " +
        "children's actions and listen to their comments, they are better able to " +
        "respond in ways that expand, or build on children's play or activity. " +
        "Teacher responses encourage children to continue interacting and talking " +
        "with teachers and peers."
    },
    {
      text: "The Listening to Children practice is comprised of two related behaviors:",
      options: new Map([
        ["teacher listening and teacher instructing", false],
        ["teacher listening and child talk", true],
        ["teacher instruction and child listening", false],
        ["teacher instruction and child talking", false]
      ]),
      feedback: "The correct answer is B. The Listening to Children practice refers " +
        "to two indicators of a high-quality language environment--teachers listening " +
        "to children and children talking. Both are important for supporting children's " +
        "learning."
    },
    {
      text: "Which of the following is one of the teacher behaviors tracked by the " +
        "observation tool that encourages child talk?",
      options: new Map([
        ["Teaching in small groups", false],
        ["Giving children classroom jobs", false],
        ["Reading books to children", false],
        ["Looking expectantly at children and showing warmth", true]
      ]),
      feedback: "The correct answer is D. When teachers look expectantly at children " +
        "with a positive expression, their body lanugage shows interest in what children " +
        "say. This may encourage children to start talking or continue talking during " +
        "conversation."
    },
    {
      text: "During a small group lesson, children buidl shapes using rubber bands on " +
        "geoboards. The teacher says, 'Look, Dwayne made a square and Lucy made a " + 
        "traingle. How are their shapes different?' In this scenario, which of the " +
        "following strategies did the teacher use?",
      options: new Map([
        ["Encouraging children to talk to peers", false],
        ["Repeating or clarifying children's comments", false],
        ["Asking open-ended questions", true],
        ["Using questions or comments to expand on children's play or talk", false]
      ]),
      feedback: "The correct answer is C. Open-ended questions do not have one correct " +
        "answer, and they typically encourage children to answer in longer sentences. " +
        "Children can think of several ways that the shapes are different."
    },
    {
      text: "A teacher observes two children in the dramatic play center silently " +
        "taking dishes and food out of the cupboards and placing them on the table. " +
        "She walks over to them and says, 'Louisa, why don't you ask Valerie what she " +
        "wants for breakfast?' What kind of teacher behavior is this?",
      options: new Map([
        ["Encouraging children to talk to peers", true],
        ["Repeating or clarifying children's comments", false],
        ["Being at eye-level with children", false],
        ["Looking expectantly at children and showing warmth", false]
      ]),
      feedback: "The correct answer is A. When teachers facilitate talk between " +
        "children, they provide specific prompts to help children talk to peers or " +
        "solve problems together during activities."
    },
    {
      text: "A teacher observes two children in the dramatic play center silently " +
        "taking dishes and food out of the cupboards and placing them on the table. " +
        "She walks over to them and says, 'Who wants to play pet store with me?' " +
        "This is an example of the teacher using questions or comments to expand on " +
        "children's play or talk.",
      options: new Map([
        ["True", false],
        ["False", true]
      ]),
      feedback: "The correct answer is False. The teacher's question about the pet store " +
        "is not responsive to what the children are already playing; therefore, her comment " +
        "does not expand, or add to, children's play. If she had said, 'I see you are " +
        "getting ready for dinner. Who is coming to eat?' she would be expanding on " +
        "their play actions."
    }
  ],
  'sequential':[
    {
      text: "Sequential activities can happen when",
      options: new Map([
        ["Children use classroom objects in a step-by-step way.", false],
        ["Children play a game with rules.", false],
        ["Children act out a pretend play scenario with a recognizable plot and role speech.", false],
        ["All of the above", true],
      ]),
      feedback: "The correct answer is D. Sequential activities can occur anytime children follow a " + 
      "logical order or sequence when doing a learning activity."
    },
    {
      text: "Children are dumping plastic insects onto the carpet. What would make this a sequential activity? ",
      options: new Map([
        ["Children make insect noises", false],
        ["Children place insects into groups based on size", false],
        ["Children act out The Grouchy Ladybug book with the insects", false],
        ["B and C", true],
      ]),
      feedback: "The correct answer is D. When children follow a predetermined sequence such as sorting " + 
      "materials based on attributes or enacting a familiar story, they are engaging in sequential activities."
    },
    {
      text: "A teacher can promote children’s participation in sequential activities by all of the following except:",
      options: new Map([
        ["Placing interlocking cubes in the block center", true],
        ["Demonstrating the steps to an activity of game", false],
        ["Supporting children’s drawing of a recognizable image", false],
        ["Encouraging children to take turns", false],
      ]),
      feedback: "The correct answer is A. In order to promote sequential use of materials, the teacher " + 
      "would have to invite children to build something with the interlocking cubes, such as a house or " + 
      "robot,  that would require them to take multiple steps toward a predetermined goal."
    },
    {
      text: "A child pretends to read a book in the library center by turning the pages one-by-one and " + 
      "telling the story aloud to a friend. This is an example of:",
      options: new Map([
        ["Using materials in a step-by-step predictable way", true],
        ["Writing a name or message", false],
        ["Following rules of a game or taking turns", false],
        ["Speaking or acting according to a pretend scenario.", false],
      ]),
      feedback: "The correct answer is A. Stories follow a sequential order which the child is demonstrating " + 
      "when telling the story aloud. The child is not actually reading the book, but knows the story well " + 
      "enough to follow the plot when telling it to the friend. "
    },
    {
      text: "Two children are in the dramatic play center. One child holds a baby doll, and the other one " + 
      "holds a pot on the stove. A teacher can support the children’s engagement in a sequential activity " + 
      "by which of the following:",
      options: new Map([
        ["Suggesting that the baby might be hungry", false],
        ["Asking what they are playing", false],
        ["Encouraging the children to talk about what the baby wants to eat", false],
        ["All of the above", true],
      ]),
      feedback: "The correct answer is D. When children are not yet acting out a recognizable scenario in " + 
      "dramatic play, a teacher can encourage them to do so by asking what they are playing. Teachers can " + 
      "also encourage children to act out specific characters (e.g., a mom or caregiver) and use predictable " + 
      "role speech (e.g., discussing what they will cook for the hungry baby). "
    },
    {
      text: "For a task or activity to be sequential, a child must be:",
      options: new Map([
        ["Playing alone", false],
        ["Following a logical order or sequence", true],
        ["Following a teacher’s directions", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is B. An activity can be considered sequential if the child follows a " + 
      "sequence of steps that build on each other towards a predetermined goal."
    },
    {
      text: "A child is making letter-like forms on paper in the art center and says, “This is a note for " + 
      "my mommy.” This is an example of:",
      options: new Map([
        ["Playing a game with rules", false],
        ["A non-sequential activity", false],
        ["Writing names or recognizable messages", true],
        ["Not enough information to choose an answer", false],
      ]),
      feedback: "The correct answer is C. If the child is making random marks without a plan, the activity " + 
      "is non-sequential. However, the child is engaging in emergent writing and the letter-like forms " + 
      "represent a planned message for the child’s mother. Thus the activity would be categorized as writing " + 
      "names or messages."
    },
    {
      text: "Two children begin to play the game Candyland, but they are moving the pieces around the board " + 
      "in a random way. How could a teacher encourage them to play the game in a logical manner?",
      options: new Map([
        ["Encourage them to take turns", false],
        ["Tell them to read the directions", false],
        ["Demonstrate the steps to play the game", false],
        ["All of the above", false],
        ["A and C", true],
      ]),
      feedback: "The correct answer is E. Two strategies that teachers might use to promote sequential " + 
      "activities are encouraging children to take turns or demonstrating the steps of a game.  Board " + 
      "games are challenging for many prekindergarten children, and therefore a teacher often must " + 
      "demonstrate the steps to the game and remind children to take turns as they are learning how to play."
    },
    {
      text: "A child is using pipe cleaners at the art center. Which one of the following is not a sequential task?",
      options: new Map([
        ["Making a triangle with the pipe cleaners", false],
        ["Sliding them across the table", true],
        ["Connecting two to make a necklace", false],
        ["Making the first letter of their name", false],
      ]),
      feedback: "The correct answer is B. In order for a task or activity to be sequential, children " + 
      "must follow a sequence of steps, such as forming the pieces to create a triangle, a necklace, " + 
      "or a letter.  B is not the correct answer because sliding pipe cleaners across the table does " + 
      "not involve clear steps that build on each other."
    },
    {
      text: "Which of the following is an example of a sequential activity with classroom materials?",
      options: new Map([
        ["Children pour water into a funnel several times in a row", false],
        ["Children repeatedly stack two blocks on top of each other then knock them down", false],
        ["Children measure blocks using crayons", true],
        ["All of the above", false],
      ]),
      feedback: "The correct answer is C. Sequential activities occur when children follow a sequence " + 
      "of steps to arrive at a predetermined goal. Repeatedly pouring water into a funnel and stacking " + 
      "blocks require several steps; however, the steps are not leading to a larger learning goal. " + 
      "In contrast, using crayons to measure blocks is an example of using materials in a " + 
      "step-by-step manner that meets a predetermined goal. "
    }
  ],
  'ac':[
    {
      text: "Two children are in the same center with a board game, but they are playing with " + 
      "the pieces independently.  How could a teacher encourage them to interact cooperatively?",
      options: new Map([
        ["Introduce visuals that remind children how to play a game", false],
        ["Explain to children that we take turns during board games and ask who would like to go first", false],
        ["Demonstrate how to move the game pieces on the board ", false],
        ["All of the above", true]
      ]),
      feedback: "The correct answer is D. Children may have a difficult time interacting " + 
      "cooperatively by playing a board game if they don’t remember how to play.  If teachers introduce " + 
      "helpful visuals or demonstrate how to play the game, it helps children begin to interact in a " + 
      "cooperative manner.  Moreover, sometimes a teacher may simply initiate the turn-taking required " + 
      "to play the game by asking the children who will go first."
    },
    {
      text: "A teacher is talking to a child who is building a tower with blocks.  This is an example of a(an):",
      options: new Map([
        ["Cooperative interaction", false],
        ["Associative interaction", false],
        ["Not enough information to choose an answer", true],
        ["None of the above", false]
      ]),
      feedback: "The correct answer is C.  In order to know whether this is an associative or " + 
      "cooperative interaction, we need more information about the child’s interaction with " + 
      "the teacher.  For example, if they are talking about what they are building together, " + 
      "the interaction is associative.  If they are alternating who places each block, the " + 
      "interaction is cooperative."
    },
    {
      text: "For an interaction to be associative or cooperative, a child must be:",
      options: new Map([
        ["Interacting with another child", false],
        ["Interacting with a teacher", false],
        ["Talking", false],
        ["A or B", true],
        ["None of the above", false]
      ]),
      feedback: "The correct answer is D.  An interaction can be considered associative or " + 
      "cooperative if the child is interacting with another person, whether it is another " + 
      "student or an adult/teacher."
    },
    {
      text: "Two children are drawing pictures at the art center.  Their interaction would be associative if:",
      options: new Map([
        ["They start moving to the carpet", false],
        ["They start talking about their artwork with each other", true],
        ["They both use the same colors", false],
        ["None of the above", false],
      ]),
      feedback: "The correct answer is B.  An interaction is not considered associative " + 
      "unless the children are talking to each other about a shared activity."
    },
    {
      text: "A teacher can promote associative and cooperative interactions by all of the following EXCEPT:",
      options: new Map([
        ["Participating in children’s play", false],
        ["Encouraging children to spread out across centers", true],
        ["Encouraging children to work together", false],
        ["Helping children find words to communicate", false]
      ]),
      feedback: "The correct answer is B.  In order for an interaction to be associative or " + 
      "cooperative, children need to be interacting with another child(ren) or an adult.  If a " + 
      "teacher encourages children to spread out, they are less likely to be in proximity to " + 
      "another person and are, thus, less likely to be interacting in an associative or cooperative manner."
    },
    {
      text: "If two children are struggling to play a game, the teacher can ___ to help the " + 
      "children have a cooperative interaction.",
      options: new Map([
        ["Demonstrate the game", false],
        ["Model good sportsmanship", false],
        ["Help children communicate (Say, “it’s my turn next”)", false],
        ["All of the above", true]
      ]),
      feedback: "The correct answer is D.  When children are struggling to play a game, it might " + 
      "be because they do not know how to play, have not developed good sportsmanship, or might " + 
      "have a hard time communicating about their play.  Thus, teachers can use specific strategies " +
      "to help promote successful cooperative interactions."
    },
    {
      text: "A teacher is helping a child build a tower with blocks.  They are taking turns " + 
      "placing blocks on top of one another.  This is an example of a(an):",
      options: new Map([
        ["Cooperative interaction", true],
        ["Associative interaction", false],
        ["Not enough information to choose an answer", false],
        ["None of the above", false]
      ]),
      feedback: "The correct answer is A. When children take turns, they are exhibiting cooperative behavior."
    },
    {
      text: "Associative interactions can happen when:",
      options: new Map([
        ["Children are playing with shared materials", false],
        ["Children are communicating about a task with their peers", false],
        ["Children are constructing an idea together", false],
        ["All of the above", true]
      ]),
      feedback: "The correct answer is D.  Associative interactions are seen when children " + 
      "are playing with shared materials, communicating about a task with others, or " + 
      "constructing an idea with a teacher or child."
    },
    {
      text: "Two children pretending to be a family are in the dramatic play area.  One is " + 
      "pretending to make dinner and says, “Your pizza is ready!”, and the other one sits at " + 
      "a table with a plastic fork and spoon.  These children are ______.",
      options: new Map([
        ["Engaging in an associative interaction", false],
        ["Engaging in a cooperative interaction", false],
        ["Acting out a recognizable scenario", false],
        ["B & C", true],
        ["A & C", false]
      ]),
      feedback: "The correct answer is D.  The children in this scenario are acting out a common " + 
      "scenario (dinnertime) and using role speech. Therefore, this is an example of a cooperative interaction."
    },
    {
      text: "Children can have cooperative interactions regardless of the materials present.  But " + 
      "some materials are particularly helpful in promoting children’s cooperative interactions. One example would be:",
      options: new Map([
        ["Board games", true],
        ["Crayons", false],
        ["Worksheets", false],
        ["Backpacks", false]
      ]),
      feedback: "The correct answer is A.  Although materials like crayons may be present during " + 
      "cooperative interactions, board games are particularly likely to help children initiate " + 
      "cooperative interactions because they require that children have a shared goal, take turns, " + 
      "and share ideas / communicate about their game."
    }
  ]
};

export default questionBank;