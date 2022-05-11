import { For, createUniqueId } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import './App.css';

function RuleBox(p) {
  return (
    <section class="rule-box">
      <div class="operation">
        <select
          value={p.operation}
          onChange={[p.onChangeOperation, p.operationId]}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
        </select>
      </div>
      <div class="operands">
        <For each={p.operands}>
          {(operand) => <div class="operand">{operand}</div>}
        </For>
        <button onClick={[p.onAddOperand, p.operationId]}>+</button>
      </div>
    </section>
  );
}

function RulesEditor() {
  const [rules, setRules] = createStore({
    root: {
      operation: 'multiply',
      operands: [],
    },
  });

  function handleChangeOperation(operationId, event) {
    setRules(
      produce((draft) => {
        draft[operationId].operation = event.target.value;
      })
    );
  }

  function handleOperandAdd(parentOperationId) {
    const operationId = createUniqueId();

    setRules(
      produce((draft) => {
        draft[parentOperationId].operands.push(operationId);
        draft[operationId] = {
          operation: 'multiply',
          operands: [],
        };
      })
    );
  }

  function renderRule(operationId) {
    const rule = rules[operationId];

    if (!rule) {
      return operationId;
    }

    const operands = rule.operands.map(renderRule);

    return (
      <RuleBox
        operationId={operationId}
        operation={rule.operation}
        operands={operands}
        onChangeOperation={handleChangeOperation}
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
