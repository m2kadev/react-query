import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Character from './Character'

const Characters = () => {
  const [page, setPage] = useState(1)

  const fetchCharacters = async ({queryKey}) => {
    console.log(queryKey)
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
    return response.json()
  }

  const { data, status, isPreviousData } = useQuery(["characters", page], fetchCharacters, {
    keepPreviousData: true
  })

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === "error") {
    return <div>Error</div>
  }

  return (
    <div className='characters'>
      {
        data?.results?.map((character) => (
          <Character character={character} />
        ))
      }

      <div>
        <button 
        disabled={page === 1}
        onClick={() => setPage(prev => prev - 1)}
        >
        Previous
        </button>
        <button
        disabled={isPreviousData && !data.info.next}
        onClick={() => setPage(prev => prev + 1)}
        >
        Next
        </button>
      </div>
    </div>
  )
}

export default Characters