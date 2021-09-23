import React, { useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './CollatorList.module.css'
import rowStyles from '../../styles/row.module.css'
import { CollatorListItem } from '../CollatorListItem/CollatorListItem'
import { Icon } from '../Icon/Icon'
import { Input } from '../Input/Input'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'

enum SORT_BY {
  Rank,
  Rank_Reverse,
  TotalReward,
  Delegators,
  LowestStake,
  Favorite,
}

function iconSortType(actual: number, expect: number) {
  return actual === expect ? 'order_yellow' : 'order_white'
}

export const CollatorList: React.FC = () => {
  const { dataSet } = useContext(BlockchainDataContext)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(SORT_BY.Rank)

  const [ranks, setRanks] = useState(new Map<string, number>())
  const [data, setData] = useState(dataSet)

  useEffect(() => {
    let ranks = new Map<string, number>()

    const sortedData = [...dataSet]
    sortedData.sort((a, b) => b.totalStake - a.totalStake)

    sortedData.forEach((value, index) => {
      ranks.set(value.collator, index + 1)
    })

    setRanks(ranks)
  }, [dataSet])

  useEffect(() => {
    let newData = !search.length
      ? [...dataSet]
      : dataSet.filter((value) => value.collator.startsWith(search))

    switch (sortBy) {
      case SORT_BY.Rank_Reverse: {
        newData.sort((a, b) => a.totalStake - b.totalStake)
        break
      }
      default:
      case SORT_BY.Rank: {
        newData.sort((a, b) => b.totalStake - a.totalStake)
        break
      }
    }
    setData(newData)
  }, [search, dataSet, sortBy])

  return (
    <table role="table" className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={rowStyles.spacer}></th>
          <th
            className={cx({
              [styles.activeSort]: sortBy === SORT_BY.Favorite,
            })}
          >
            Collator
            <span
              className={styles.searchButton}
              onClick={(e) => {
                e.stopPropagation()
                setShowSearch(!showSearch)
              }}
            >
              <Icon type="search" />
            </span>
          </th>
          <th></th>
          <th
            className={cx({
              [styles.activeSort]:
                sortBy === SORT_BY.Rank || sortBy === SORT_BY.Rank_Reverse,
            })}
            onClick={() =>
              setSortBy(
                sortBy === SORT_BY.Rank ? SORT_BY.Rank_Reverse : SORT_BY.Rank
              )
            }
          >
            Rank | Total Stake
            {sortBy === SORT_BY.Rank ? (
              <Icon type={iconSortType(sortBy, SORT_BY.Rank)} width={13} />
            ) : (
              <Icon
                type={iconSortType(sortBy, SORT_BY.Rank_Reverse)}
                width={13}
              />
            )}
          </th>
          <th
            className={cx({
              [styles.activeSort]: sortBy === SORT_BY.LowestStake,
            })}
          >
            Lowest Stake
          </th>
          <th
            className={cx({
              [styles.activeSort]: sortBy === SORT_BY.Delegators,
            })}
            colSpan={2}
          >
            Delegators
          </th>
          <th>
            <Icon type="tokens_white" />
          </th>
          <th className={rowStyles.spacer}></th>
        </tr>
        {showSearch && (
          <tr className={styles.search}>
            <th colSpan={42}>
              <div>
                <Input
                  autoFocus
                  autoComplete="off"
                  placeholder="Search Collator"
                  value={search}
                  onInput={(event) => setSearch(event.target.value)}
                />
              </div>
            </th>
          </tr>
        )}
      </thead>
      <tbody className={styles.tableBody}>
        {data.map((entry) => (
          <CollatorListItem
            entry={entry}
            rank={ranks.get(entry.collator)}
            key={entry.collator}
          />
        ))}
      </tbody>
    </table>
  )
}
