import React from 'react'
import Head from 'next/head'

import {CopyToClipboard} from 'react-copy-to-clipboard';



const EXAMPLE_BOARD = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const EXAMPLE = {
  train: [
    {input: EXAMPLE_BOARD, output: EXAMPLE_BOARD},
  ],
  test: [
    {input: EXAMPLE_BOARD, output: EXAMPLE_BOARD},
  ],
}

const COLOR_MAP = {
  0: "bg-black",
  1: "bg-red-600",
  2: "bg-orange-600",
  3: "bg-yellow-600",
  4: "bg-green-600",
  5: "bg-teal-600",
  6: "bg-sky-600",
  7: "bg-indigo-600",
  8: "bg-purple-600",
  9: "bg-pink-600",
};

function BoardSection({children, title, bg_color="bg-white", addPair}){
  return <div className={`${bg_color} my-8 p-6`}>
    <h2 className={`text-3xl font-bold text-center`}>{title}</h2>
    {children}
    <div className="flex flex-row justify-center">
      <Button onClick={() => addPair()}>Add Pair</Button>
    </div>
  </div>;
}

function Board({data, setValue, setDimensions}){
  const num_rows = data.length;
  const num_cols = data[0].length;
  return (<div>
    <div>
      Rows: <input min="1" max="30" type="number" value={num_rows} onChange={ev => setDimensions({rows: ev.target.value, cols: num_cols})}/>
      <br/>
      Cols: <input min="1" max="30" type="number" value={num_cols} onChange={ev => setDimensions({rows: num_rows, cols: ev.target.value})}/>
    </div>
    <div className="mx-8 flex flex-col">
      {data.map((row, row_idx) => <div key={row_idx} className="flex flex-row">
        {row.map((val, col_idx) => 
          <div key={col_idx} className={`h-8 w-8 ${COLOR_MAP[val]} text-center mr-px mb-px select-none`} onClick={() => setValue({
            i: row_idx,
            j: col_idx,
          })}>&nbsp;</div>
        )}
      </div>)}
    </div>
  </div>);
}

function Button({children, ...args}){
  return <button className="border rounded p-2 border-1" {...args}>{children}</button>;
}

function addParams(func, params){
  return ({...args}) => func({...args, ...params});
}

function BoardPair({input, output, setValue, setDimensions, deletePair}){
  function forInput(func){
    return addParams(func, {board_name: "input"});
  }
  function forOutput(func){
    return addParams(func, {board_name: "output"});
  }
  return <div className="flex flex-row items-center my-8">
    <Board data={input} setValue={forInput(setValue)} setDimensions={forInput(setDimensions)}/>
    <Board data={output} setValue={forOutput(setValue)} setDimensions={forOutput(setDimensions)}/>
    <div>
      <Button onClick={() => deletePair()}>Delete Pair</Button>
    </div>
  </div>;
}

function addRow(board){
  board.push(board[board.length-1]);
}

function removeRow(board){
  board.splice(board.length-1);
}

function addColumn(board){
  board.forEach(col => col.push(col[col.length-1]));
}

function removeColumn(board){
  board.forEach(col => col.splice(col.length-1));
}

function deepCopy(obj){
  return JSON.parse(JSON.stringify(obj));
}

function ColorSelector({color, setColor}){
  return (<div className="fixed top-0 w-screen h-16 flex flex-row">
    {Object.keys(COLOR_MAP).map(c => <div 
      key={c}
      className={`w-full h-full select-none text-center ${COLOR_MAP[c]} ${c == color ? "border-4 border-white" : ""}`}
      onClick={() => setColor(c)}
    >
      &nbsp;
    </div>)}
  </div>);
}

export default function Home() {
  const [riddle, setRiddle] = React.useState(EXAMPLE);
  const [color, setColor] = React.useState(0);
  const [copiedToClipboard, setCopiedToClipboard] = React.useState(false);

  const riddleString = JSON.stringify(riddle);

  React.useEffect(() => {
    setCopiedToClipboard(false);
  }, [riddle]);

  function setValue({set_name, pair_idx, board_name, i, j}){
    setRiddle(riddle => {
      const new_riddle = deepCopy(riddle);
      new_riddle[set_name][pair_idx][board_name][i][j] = parseInt(color);
      return new_riddle;
    })
  }

  function setDimensions({set_name, pair_idx, board_name, rows, cols}){
    if(rows < 1 || cols < 1){
      return;
    }
    setRiddle(riddle => {
      const new_riddle = deepCopy(riddle);
      const board = new_riddle[set_name][pair_idx][board_name];
      while(board.length < rows){
        addRow(board);
      }
      while(board.length > rows){
        removeRow(board);
      }
      while(board[0].length < cols){
        addColumn(board);
      }
      while(board[0].length > cols){
        removeColumn(board);
      }
      return new_riddle;
    })
  }

  function addPair({set_name}){
    setRiddle(riddle => {
      const new_riddle = deepCopy(riddle);
      const rset = new_riddle[set_name];
      rset.push(deepCopy(rset[rset.length-1]));
      return new_riddle;
    });
  }

  function deletePair({set_name, pair_idx}){
    setRiddle(riddle => {
      const new_riddle = deepCopy(riddle);
      const rset = new_riddle[set_name];
      if(rset.length > 1){
        rset.splice(pair_idx, 1);
      }
      return new_riddle;
    });
  }

  function forTrain(func, pair_idx){
    return addParams(func, {pair_idx, set_name: 'train'});
  }

  function forTest(func, pair_idx){
    return addParams(func, {pair_idx, set_name: 'test'});
  }

  return (
    <>
      <Head><title>ARC Level Editor</title></Head>
      <ColorSelector color={color} setColor={setColor}/>
      <div className="w-screen flex flex-col items-center mt-8">
        <BoardSection title="Train" addPair={forTrain(addPair)}>
          {riddle.train.map((board_pair, pair_idx) => <BoardPair 
            key={pair_idx} {...board_pair} 
            setValue={forTrain(setValue, pair_idx)}
            setDimensions={forTrain(setDimensions, pair_idx)}
            deletePair={forTrain(deletePair, pair_idx)}
            />)}
        </BoardSection>
        <BoardSection title="Test" bg_color="bg-slate-300" addPair={forTest(addPair)}>
          {riddle.test.map((board_pair, pair_idx) => <BoardPair 
            key={pair_idx} {...board_pair} 
            setValue={forTest(setValue, pair_idx)}
            setDimensions={forTest(setDimensions, pair_idx)}
            deletePair={forTest(deletePair, pair_idx)}
            />)}
        </BoardSection>
      </div>
      <div className="my-auto w-full flex flex-col items-center">
        <div className="p-4 m-4 border">{riddleString}</div>
        <CopyToClipboard text={riddleString} onCopy={() => setCopiedToClipboard(true)}>
          {!copiedToClipboard ? 
            <button className="border-2 p-2 rounded mb-8">Copy to clipboard</button>
            : <span>Copied!</span>
        }
        </CopyToClipboard>
      </div>
      </>
  )
}

