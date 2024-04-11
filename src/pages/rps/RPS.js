export class RockPaperScissors {
  constructor(username) {
    this.username = username;
    this.score = {
      user: 0,
      cpu: 0 
    },
    this.gameHistoryLog = [];
  }

  //my own logic - L
  generateCPUResponse(){
    const acceptedValues = [ `rock`, `paper`, `scissors` ];
    const randNum = Math.floor(Math.random() * 3);
    return acceptedValues.at(randNum);
  }
  
  //my own logic - L
  determineWinner(userSelection, cpuSelection){
    if (userSelection == cpuSelection){
      return `tie`;
    }
    else if (userSelection == `rock` && cpuSelection == `scissors` || 
      userSelection == `paper` && cpuSelection == `rock` ||
      userSelection == `scissors` && cpuSelection == `paper`){
      return `win`;
    }
    else{
      return `lose`;
    }
  }

  //my own logic - L
  play(userSelection){
    let cpuResponse = this.generateCPUResponse();
    let whoWon = this.determineWinner(userSelection, cpuResponse);
    let winner = ``;

    if (whoWon == `win`){
      this.score.user ++;
      winner = `${this.username} wins wins`
    }
    else if (whoWon == 'lose'){
      this.score.cpu ++;
      winner = `CPU wins wins`
    }
    else{
      winner = `It's a tie`
    }

    this.gameHistoryLog.push(`${this.username} selected ${userSelection}, CPU selected ${cpuResponse}: ${winner}`)
  }

}