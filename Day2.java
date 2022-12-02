import java.io.IOException;
import java.util.Arrays;

class Scratch {
  
  private static final String input = "Puzzle Input Redacted";

  public static void main(String[] args) throws IOException {
    int yourScore = 0;
    int oppScore = 0;
    for(String[] round : Arrays.stream(input.split(",")).map(round -> round.split(" ")).toList()){
      RPS opp = RPS.valueOf(round[0]);
      RPS you;
      if(round[1].equals("X")){
        you = opp.willBeat();
        oppScore += opp.points + 6;
        yourScore += you.points;
      } else if (round[1].equals("Y")) {
        you = opp;
        yourScore += you.points + 3;
        oppScore += opp.points + 3;
      } else {
        you = opp.beatBy();
        yourScore += you.points + 6;
        oppScore += opp.points;
      }
    }
  }

  enum RPS {
    A(1), B(2), C(3), X(1), Y(2), Z(3);

    final int points;
    RPS[] beats;

    static{
      A.beats = new Scratch.RPS[]{Z};
      B.beats = new Scratch.RPS[]{X};
      C.beats = new Scratch.RPS[]{Y};
      X.beats = new Scratch.RPS[]{C};
      Y.beats = new Scratch.RPS[]{A};
      Z.beats = new Scratch.RPS[]{B};
    }
    RPS(int points){
      this.points = points;
    }

    RPS willBeat() {
      return this.beats[0];
    }

    RPS beatBy() {
      return Arrays.stream(RPS.values()).filter(rps -> Arrays.asList(rps.beats).contains(this)).findFirst().get();
    }
  }
}
