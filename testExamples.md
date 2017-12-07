# Test examples :eyes:
*Some details that do not change the function of the test, such as names and the cell moves made by the player who was not supposed to win, were not made the same in the actual tests* 

## Feature: Create game

**Scenario: Check if game is created correctly**   
*Given* (no requierments)  
*When* a user named Anna creates a game.  
*Then* a game is created.  

## Feature: Join Game 

**Scenario: A game is joined successfully**  
*Given* a user has made a game.  
*When* another user Anna joins the game.  
*Then* the user Anna should have joined the game.  

**Scenario: Attempting to join a full game**  
*Given* a user has made a game.  
    and another user has joined the game.  
*When* a thrid user, Jon, asks to join the game.  
*Then* Jon does not get to join the game  
    and an FullGameJoinAttempted should be emitted.  

## Feature: Place move

**Scenario: First move in game made**  
*Given* a user Anna has made a game  
    and another user Begga has joined the game.  
*When* Anna makes a move, putting a X in cell nr. 0.  
*Then* cell nr. 0 should have X,  
    and other cells should be empty.  

**Scenario: Making a move on an occupied cell**  
*Given* a user Anna has made a game  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 0  
*When* Begga makes a move, putting an O in cell nr. 0.  
*Then* cell nr. 0 should still have an X,  
    and all other cells should be empty,  
    and IllegalMove should be emitted.  

**Scenario: Making a move when it is not the user's turn**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 0.  
*When* Anna makes a move, putting an X in cell nr. 0.  
*Then* cell nr. 0 should still have an X,  
    and all other ceels should be empty,  
    and NotYourMove should be emitted.  

**Scenario: Game won (horizontal 1)**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 0  
    and Begga has made a move, putting an O in cell nr. 3  
    and Anna has made a move, putting an X in cell nr. 1  
    and Begga has made a move, putting an O in cell nr. 4  
*When* when Anna makes a move, putting an X in cell nr. 2  
*Then* the table should be [X][X][X]/[O][O][]/[][][]  
    and GameWon should be emitted, with Anna as winner.  

**Scenario: Game won (horizontal 2)**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 0  
    and Begga has made a move, putting an O in cell nr. 3  
    and Anna has made a move, putting an X in cell nr. 1  
    and Begga has made a move, putting an O in cell nr. 4  
    and Anna has made am ove, putting an X in cell nr. 6  
*When* when Begga makes a move, putting an O in cell nr. 5  
*Then* the table should be [X][X][]/[O][O][O]/[X][][]  
    and GameWon should be emitted, with Begga as winner.  

**Scenario: Game won (horizontal 3)**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 6  
    and Begga has made a move, putting an O in cell nr. 3  
    and Anna has made a move, putting an X in cell nr. 7  
    and Begga has made a move, putting an O in cell nr. 4  
*When* when Anna makes a move, putting an X in cell nr. 8  
*Then* the table should be [][][]/[O][O][]/[X][X][X]  
    and GameWon should be emitted, with Anna as winner.  

**Scenario: Game won (vertical 1)**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. o  
    and Begga has made a move, putting an O in cell nr. 2  
    and Anna has made a move, putting an X in cell nr. 3  
    and Begga has made a move, putting an O in cell nr. 4  
*When* when Anna makes a move, putting an X in cell nr. 6  
*Then* the table should be [X][][O]/[X][O][]/[X][][]  
    and GameWon should be emitted, with Anna as winner.  

**Scenario: Game won (vertical 2)**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 1  
    and Begga has made a move, putting an O in cell nr. 3  
    and Anna has made a move, putting an X in cell nr. 4  
    and Begga has made a move, putting an O in cell nr. 5  
*When* when Anna makes a move, putting an X in cell nr. 7  
*Then* the table should be [][X][]/[O][X][O]/[][X][]  
    and GameWon should be emitted, with Anna as winner.  

**Scenario: Game won (vertical 3)**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 2  
    and Begga has made a move, putting an O in cell nr. 3  
    and Anna has made a move, putting an X in cell nr. 5  
    and Begga has made a move, putting an O in cell nr. 4  
*When* when Anna makes a move, putting an X in cell nr. 8  
*Then* the table should be [][][X]/[O][O][X]/[][][X]  
    and GameWon should be emitted, with Anna as winner.  

**Scenario: Game won (diagonal 1)**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 2  
    and Begga has made a move, putting an O in cell nr. 0  
    and Anna has made a move, putting an X in cell nr. 5  
    and Begga has made a move, putting an O in cell nr. 4  
    and Anna has made a move, putting an X in cell nr. 1  
*When* when Begga makes a move, putting an O in cell nr. 8  
*Then* the table should be [O][][X]/[][O][X]/[][][O]  
    and GameWon should be emitted, with Begga as winner.  

**Scenario: Game won (diagonal 2)**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 2  
    and Begga has made a move, putting an O in cell nr. 3  
    and Anna has made a move, putting an X in cell nr. 4  
    and Begga has made a move, putting an O in cell nr. 5  
*When* when Anna makes a move, putting an X in cell nr. 6  
*Then* the table should be [][][X]/[O][X][O]/[X][][]  
    and GameWon should be emitted, with Anna as winner.  

**Scenario: Game won on last possible move**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 0  
    and Begga has made a move, putting an O in cell nr. 1  
    and Anna has made a move, putting an X in cell nr. 2  
    and Begga has made a move, putting an O in cell nr. 3  
    and Anna has made a move, putting an X in cell nr. 4  
    and Begga has made a move, putting an O in cell nr. 5  
    and Anna has made a move, putting an X in cell nr. 7  
    and Begga has made a move, putting an O in cell nr. 6  
*When* when Anna makes a move, putting an X in cell nr. 8  
*Then* the table should be [X][O][X]/[O][X][O]/[O][X][X]  
    and GameWon should be emitted, with Anna as winner.  
    and GameDraw should not be emitted.  
    
**Scenario: A draw**  
*Given* a user Anna has made a game,  
    and another user Begga has joined the game,  
    and Anna has made a move, putting an X in cell nr. 1  
    and Begga has made a move, putting an O in cell nr. 2  
    and Anna has made a move, putting an X in cell nr. 3  
    and Begga has made a move, putting an O in cell nr. 4  
    and Anna has made a move, putting an X in cell nr. 5  
    and Begga has made a move, putting an O in cell nr. 7  
    and Anna has made a move, putting an X in cell nr. 6  
    and Begga has made a move, putting an O in cell nr. 0  
*When* when Anna makes a move, putting an X in cell nr. 8  
*Then* the table should be [O][X][O]/[X][O][X]/[X][O][X]  
    and GameDraw should be emitted.  

