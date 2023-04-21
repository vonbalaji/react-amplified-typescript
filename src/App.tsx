
import './App.css';
import { NavBar, NoteUICollection, CreateNote, UpdateNote } from './ui-components'
import {Auth} from 'aws-amplify';
import { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { DataStore } from 'aws-amplify'

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateNote, setUpdateNote] = useState()

  const signOut = ()=>  {
    Auth.signOut();
  }
  
  return (
    <>
      <NavBar
        marginBottom='20px' width='100%'
        overrides={{
          Button31632483: { onClick: () => setShowCreateModal(true)},
            Button31632487 : { onClick : async() => {
              await DataStore.clear();
              signOut();
            }} 
        }}
      />
      <div className='container'>
        <NoteUICollection overrideItems={({ item }) => {
          return {
            overrides: {
              Vector31472464: {
                as: 'button',
                onClick: () => {
                  setShowUpdateModal(true)
                  setUpdateNote(item)
                }
              }
            }
          }
        }}
        />
      </div>

      <div className='modal' style={{ display: showCreateModal === false ? 'none' : 'inline' }}>
        <CreateNote overrides={{
          MyIcon: {
            as: 'button',
            onClick: () => setShowCreateModal(false)
          }
        }}
        />
      </div>

      <div className='modal' style={{ display: showUpdateModal === false ? 'none' : 'inline' }}>
        <UpdateNote
          note={updateNote} overrides={{
            MyIcon: {
              as: 'button',
              onClick: () => setShowUpdateModal(false)
            }
          }}
        />
      </div>
    </>
  );
}

export default withAuthenticator(App);
