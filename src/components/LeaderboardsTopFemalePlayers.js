import React, { useEffect, useContext, useState } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import TranslationContext from '../contexts/TranslationContext';

function IndustryEsportsViewership() {
  const [tableData, setTableData] = useState([]);
  const t = useContext(TranslationContext);
  const pageData = t.data;

  const countries = _.sortBy(_.uniqBy(tableData, 'country'), 'country').map(
    row => row.country
  );
  const games = _.sortBy(_.uniqBy(tableData, 'main-game'), 'main-game').map(
    row => row['main-game']
  );

  const formatNumber = num =>
    (+num || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

  useEffect(() => {
    const csvFilePath = 'data/leaderboards_top-female-players.csv';

    d3.csv(csvFilePath).then(data => {
      setTableData(data);

      window.tableFunctionality();
    });
  }, []);

  return (
    tableData && (
      <article className='screen screen--sub'>
        <h1 className='screen__heading'>{pageData.cat2_sub6_title}</h1>

        <ul className='screen__desc'>
          <li className='screen__desc__i'>{pageData.cat2_sub6_desc1}</li>
          <li className='screen__desc__i'>{pageData.cat2_sub6_desc2}</li>
        </ul>

        <div className='table-data table-data--7-col'>
          <div className='table-filters'>
            <select className='table-filter' data-name='country'>
              <option value=''>{pageData.cat2_sub6_txt1}</option>
              {countries.map((name, index) => (
                <option value={name} key={index}>
                  {name}
                </option>
              ))}
            </select>

            <select className='table-filter' data-name='main-game'>
              <option value=''>{pageData.cat2_sub6_txt2}</option>
              {games.map((name, index) => (
                <option value={name} key={index}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className='table-wrap'>
            <div className='table-inner'>
              <div className='table__head'>
                <div className='table__th' data-name='rank'>
                  {pageData.cat2_sub6_txt3}
                </div>
                <div className='table__th' data-name='country'>
                  {pageData.cat2_sub6_txt4}
                </div>
                <div className='table__th' data-name='player-id'>
                  {pageData.cat2_sub6_txt5}
                </div>
                <div className='table__th' data-name='player-name'>
                  {pageData.cat2_sub6_txt6}
                </div>
                <div className='table__th' data-name='total-winnings'>
                  {pageData.cat2_sub6_txt7}
                </div>
                <div className='table__th' data-name='main-game'>
                  {pageData.cat2_sub6_txt8}
                </div>
                <div className='table__th' data-name='winnings-from-main-game'>
                  {pageData.cat2_sub6_txt9}
                </div>
              </div>
              <div className='table__body'>
                {tableData.map((row, index) => (
                  <div className='table__row' key={index}>
                    <div className='table__td'>{row['rank']}</div>
                    <div className='table__td'>{row['country']}</div>
                    <div className='table__td'>{row['player-id']}</div>
                    <div className='table__td'>{row['player-name']}</div>
                    <div className='table__td'>
                      ${formatNumber(row['total-winnings'])}
                    </div>
                    <div className='table__td'>{row['main-game']}</div>
                    <div className='table__td'>
                      ${formatNumber(row['main-winnings'])}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  );
}

export default IndustryEsportsViewership;
