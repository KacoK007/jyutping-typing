import React from 'react';

export default function InfoModal({ showInfo, setShowInfo }) {
  if (!showInfo) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={() => setShowInfo(false)}
          aria-label="Close"
        >×</button>
        <h2 className="text-xl font-bold mb-3">Jyutping Information</h2>
        <div className="text-gray-700">
          <p className="mb-4">Jyutping is a romanization system for Cantonese. Below are reference tables of initials (聲母) and finals (韻腹、韻尾) used in Jyutping, with example characters.</p>
          
          <h3 className="text-lg font-semibold mb-2">Initials (聲母)</h3>
          <table className="w-full mb-2 border-collapse">
            <tbody>
              {[
                [
                  { initial: 'b', char: '巴' },
                  { initial: 'p', char: '怕' },
                  { initial: 'm', char: '媽' },
                  { initial: 'f', char: '花' },
                  { initial: 'd', char: '打' },
                ],
                [
                  { initial: 't', char: '他' },
                  { initial: 'n', char: '拿' },
                  { initial: 'l', char: '啦' },
                  { initial: 'g', char: '家' },
                  { initial: 'k', char: '卡' },
                ],
                [
                  { initial: 'ng', char: '牙' },
                  { initial: 'h', char: '蝦' },
                  { initial: 'gw', char: '瓜' },
                  { initial: 'kw', char: '跨' },
                  { initial: 'w', char: '娃' },
                ],
                [
                  { initial: 'j', char: '也' },
                  { initial: 'z', char: '渣' },
                  { initial: 'c', char: '叉' },
                  { initial: 's', char: '沙' },
                  { initial: '∅', char: '啊' },
                ],
              ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map(({ initial, char }, colIndex) => (
                    <td key={colIndex} className="border text-center">
                      <div className="font-mono">{initial}</div>
                      <div>{char}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-2">Finals (韻腹、韻尾)</h3>
          <table className="w-full border-collapse">
            <tbody>
              {[
                [
                  { final: 'aa', char: '沙' },
                  { final: 'a', char: '新' },
                  { final: 'e', char: '些' },
                  { final: 'i', char: '詩' },
                  { final: 'o', char: '疏' },
                ],
                [
                  { final: 'oe', char: '靴' },
                  { final: 'eo', char: '詢' },
                  { final: 'u', char: '夫' },
                  { final: 'yu', char: '書' },
                  { final: '∅', char: '唔' },
                ],
                [
                  { final: '-i', char: '西' },
                  { final: '-u', char: '收' },
                  { final: '-m', char: '心' },
                  { final: '-n', char: '新' },
                  { final: '-ng', char: '生' },
                ],
                [
                  { final: '-p', char: '濕' },
                  { final: '-t', char: '失' },
                  { final: '-k', char: '塞' },
                  null,
                  null,
                ],
              ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((item, colIndex) => (
                    <td key={colIndex} className="border text-center">
                      {item ? (
                        <>
                          <div className="font-mono">{item.final}</div>
                          <div>{item.char}</div>
                        </>
                      ) : (
                        <div> </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}