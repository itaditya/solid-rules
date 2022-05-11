import { For, createSignal, createUniqueId } from 'solid-js';
import './App.css';

function RuleBox(p) {
  return (
    <section class="rule-box">
      <div class="operation">{p.operation}</div>
      <div class="operands">
        <For each={p.operands}>
          {(operand) => <div class="operand">{operand}</div>}
        </For>
        <button onClick={[p.onAddOperand, p.operation]}>Add</button>
      </div>
    </section>
  );
}

function RulesEditor() {
  const [rules, setRules] = createSignal({
    root: [],
  });

  function handleOperandAdd(parentOperationId) {
    const operationId = createUniqueId();

    setRules((oldRules) => {
      const parentOperands = oldRules[parentOperationId];
      const updatedOperands = [...parentOperands, operationId];

      return {
        ...oldRules,
        [parentOperationId]: updatedOperands,
        [operationId]: [],
      };
    });
  }

  function renderRule(operationId) {
    const rule = rules()[operationId];

    if (!rule) {
      return operationId;
    }

    const operands = rule.map(renderRule);

    return (
      <RuleBox
        operation={operationId}
        operands={operands}
        onAddOperand={handleOperandAdd}
      />
    );
  }

  return <div class="rules-editor">{renderRule('root')}</div>;
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

/*
<RuleBox
  operation="multiply"
  operands={[
    <RuleBox
      operation="add"
      operands={[
        <RuleBox operation="divide" operands={[8, 4]} />,
        <RuleBox operation="subtract" operands={[9, 7]} />,
      ]}
    />,
    <RuleBox operation="subtract" operands={[2, 3]} />,
  ]}
/>
*/
