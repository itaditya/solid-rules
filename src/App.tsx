import { For } from 'solid-js';
import './App.css';

function RuleBox(p) {
  return (
    <section class="rule-box">
      <div class="operation">{p.operation}</div>
      <div class="operands">
        <For each={p.operands}>{(operand) => <div>{operand}</div>}</For>
      </div>
    </section>
  );
}

function RulesEditor() {
  return (
    <div class="rules-editor">
      <RuleBox
        operation="multiply"
        operands={[
          <RuleBox operation="add" operands={[7, 2]} />,
          <RuleBox operation="subtract" operands={[2, 3]} />,
        ]}
      />
    </div>
  );
}

function App() {
  return (
    <div class="App">
      <h2>Rules Editor Demo</h2>
      <RulesEditor />
    </div>
  );
}

export default App;
