import React from 'react'
import Head from 'next/head'

const EXAMPLE = {"test": [{"input": [[7, 0, 7], [7, 0, 7], [7, 7, 0]], "output": [[7, 0, 7, 0, 0, 0, 7, 0, 7], [7, 0, 7, 0, 0, 0, 7, 0, 7], [7, 7, 0, 0, 0, 0, 7, 7, 0], [7, 0, 7, 0, 0, 0, 7, 0, 7], [7, 0, 7, 0, 0, 0, 7, 0, 7], [7, 7, 0, 0, 0, 0, 7, 7, 0], [7, 0, 7, 7, 0, 7, 0, 0, 0], [7, 0, 7, 7, 0, 7, 0, 0, 0], [7, 7, 0, 7, 7, 0, 0, 0, 0]]}], "train": [{"input": [[0, 7, 7], [7, 7, 7], [0, 7, 7]], "output": [[0, 0, 0, 0, 7, 7, 0, 7, 7], [0, 0, 0, 7, 7, 7, 7, 7, 7], [0, 0, 0, 0, 7, 7, 0, 7, 7], [0, 7, 7, 0, 7, 7, 0, 7, 7], [7, 7, 7, 7, 7, 7, 7, 7, 7], [0, 7, 7, 0, 7, 7, 0, 7, 7], [0, 0, 0, 0, 7, 7, 0, 7, 7], [0, 0, 0, 7, 7, 7, 7, 7, 7], [0, 0, 0, 0, 7, 7, 0, 7, 7]]}, {"input": [[4, 0, 4], [0, 0, 0], [0, 4, 0]], "output": [[4, 0, 4, 0, 0, 0, 4, 0, 4], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 4, 0, 0, 0, 0, 0, 4, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 4, 0, 4, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 4, 0, 0, 0, 0]]}, {"input": [[0, 0, 0], [0, 0, 2], [2, 0, 2]], "output": [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 2], [2, 0, 2, 0, 0, 0, 2, 0, 2]]}, {"input": [[6, 6, 0], [6, 0, 0], [0, 6, 6]], "output": [[6, 6, 0, 6, 6, 0, 0, 0, 0], [6, 0, 0, 6, 0, 0, 0, 0, 0], [0, 6, 6, 0, 6, 6, 0, 0, 0], [6, 6, 0, 0, 0, 0, 0, 0, 0], [6, 0, 0, 0, 0, 0, 0, 0, 0], [0, 6, 6, 0, 0, 0, 0, 0, 0], [0, 0, 0, 6, 6, 0, 6, 6, 0], [0, 0, 0, 6, 0, 0, 6, 0, 0], [0, 0, 0, 0, 6, 6, 0, 6, 6]]}, {"input": [[2, 2, 2], [0, 0, 0], [0, 2, 2]], "output": [[2, 2, 2, 2, 2, 2, 2, 2, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 2, 0, 2, 2, 0, 2, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 2, 2, 2, 2, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 0, 2, 2]]}]};

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

function BoardSection({children, title, bg_color="bg-white"}){
  return <div className={`${bg_color}`}>
    <h2 className={`text-3xl font-bold text-center`}>{title}</h2>
    {children}
  </div>;
}

function Board({data, setValue}){
  const num_rows = data.length;
  const num_cols = data[0].length;
  return (<div>
    <div>
      Rows: {num_rows}
      <br/>
      Cols: {num_cols}
    </div>
    <div className="mx-8 flex flex-col">
      {data.map((row, row_idx) => <div key={row_idx} className="flex flex-row">
        {row.map((val, col_idx) => 
          <div key={col_idx} className={`h-8 w-8 ${COLOR_MAP[val]} text-center mr-px mb-px`} onClick={() => setValue({
            i: row_idx,
            j: col_idx,
            val: (val + 1) % 10,
          })}>{val}</div>
        )}
      </div>)}
    </div>
  </div>);
}

function BoardPair({input, output, setValue}){
  return <div className="flex flex-row items-center my-8">
    <Board data={input} setValue={({...args}) => setValue({...args, board: "input"})}/>
    <Board data={output} setValue={({...args}) => setValue({...args, board: "output"})}/>
  </div>;
}

export default function Home() {
  const [riddle, setRiddle] = React.useState(EXAMPLE);

  function setValue({set_name, pair_idx, board, i, j, val}){
    setRiddle(riddle => {
      const new_riddle = JSON.parse(JSON.stringify(riddle));
      new_riddle[set_name][pair_idx][board][i][j] = val;
      return new_riddle;
    })
  }

  return (
    <>
      <Head><title>ARC Level Editor</title></Head>
      <div className="w-screen flex flex-col items-center">
        <BoardSection title="Train">
          {riddle.train.map((board_pair, idx) => <BoardPair key={idx} {...board_pair} setValue={({...args})=>setValue({...args, set_name: 'train', pair_idx:idx})}/>)}
        </BoardSection>
        <BoardSection title="Test" bg_color="bg-slate-300">
          {riddle.test.map((board_pair, idx) => <BoardPair key={idx} {...board_pair} setValue={({...args})=>setValue({...args, set_name: 'test', pair_idx:idx})}/>)}
        </BoardSection>
      </div>
      </>
  )
}
