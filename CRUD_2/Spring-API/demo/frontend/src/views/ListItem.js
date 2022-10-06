import React from 'react'

// *****************************

// This is for testing API access

// *****************************

const ListItem = ({ item }) => {
  return (
    <>
      <li>ID: {JSON.stringify(item.id)}</li>
      <li>Message: {JSON.stringify(item.message)}</li>
      <li>Name: {JSON.stringify(item.name)}</li>
      <li>{JSON.stringify(item.username)}</li>
      <li>{JSON.stringify(item.email)}</li>
      <li>{JSON.stringify(item.address)}</li>
      <li>{JSON.stringify(item.phone)}</li>
      <li>{JSON.stringify(item.website)}</li>
      <li>{JSON.stringify(item.company)}</li>
    </>
  )
}

export default ListItem