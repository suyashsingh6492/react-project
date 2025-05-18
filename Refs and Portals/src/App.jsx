import Player from './components/Player.jsx';
import { TimerChallege } from './components/TimerChallenges.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallege title="Easy" targetTime={1} />
        <TimerChallege title="No Easy" targetTime={5} />
        <TimerChallege title="Getting Tough" targetTime={10} />
        <TimerChallege title="Pros Only" targetTime={15} />

      </div>
    </>
  );
}

export default App;
