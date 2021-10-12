import React, { useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './CollatorList.module.css'
import rowStyles from '../../styles/row.module.css'
import { CollatorListItem } from '../CollatorListItem/CollatorListItem'
import { Icon } from '../Icon/Icon'
import { Input } from '../Input/Input'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import { DataWithRank } from '../../types'

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

  const [dataWithRanks, setDataWithRanks] = useState<DataWithRank[]>([])
  const [data, setData] = useState<DataWithRank[]>([])

  useEffect(() => {
    const sortedData = [...dataSet]
    sortedData.sort((a, b) => b.totalStake - a.totalStake)

    const dataWithRanks: DataWithRank[] = sortedData.map((value, index) => {
      return { ...value, rank: index + 1 }
    })

    setDataWithRanks(dataWithRanks)
  }, [dataSet])

  useEffect(() => {
    let newData = !search.length
      ? [...dataWithRanks]
      : dataWithRanks.filter((value) => value.collator.startsWith(search))

    switch (sortBy) {
      case SORT_BY.Rank_Reverse: {
        newData.sort((a, b) => b.rank - a.rank)
        break
      }
      default:
      case SORT_BY.Rank: {
        newData.sort((a, b) => a.rank - b.rank)
        break
      }
    }
    setData(newData)
  }, [search, dataSet, sortBy, dataWithRanks])

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
                setSearch('')
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
          <CollatorListItem entry={entry} key={entry.collator} />
        ))}
      </tbody>
    </table>
  )
}
