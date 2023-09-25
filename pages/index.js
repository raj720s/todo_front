import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { api } from '../globals'


export default function Home(props) {
  const [current, setCurrent] = useState({ task: '', id: '' })
  const [tasks, setTasks] = useState(props.tasks)

  console.log(tasks)

  const handleChange = (e) => {
    setCurrent({ task: e.target.value, id: '' })
  }
  const updateTaskStatus = task => {
    return console.log(task)
  }
  const addTask = (e) => {
    e.preventDefault()
    if (current.id) {
      //update task name

    } else {
      // post task 
      const data = {
        task: current.task, status: false
      }
      fetch(api + '/task', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      }).then(data => getServerSideProps)

    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Todox!</a>
        </h1>

        <div className={styles.taskContainer}>
          <div className={styles.taskbox}>
            <form className={styles.taskform}>
              <input className={styles.taskinput} type="text" placeholder='task' required onChange={handleChange} value={current.task} />
              <button className={styles.addbtn} onClick={addTask} type='submit'>add/update</button>
            </form>
          </div>
          <div className={styles.taskList}>
            {
              tasks.length && (
                tasks.map(task => {
                  return (
                    <div className={styles.taskitem} key={task.id}>
                      <input type="checkbox" checked={task.status} onChange={() => updateTaskStatus(task)} />
                      <p className={styles.taskitemname}>{task.task} </p>
                      <button onClick={() => editTask(task.id)}>&#9998;</button>
                      <button onClick={() => deleteTask(task.id)}>&#10006;</button>
                    </div>
                  )
                })
              ) || (
                <div className={styles.notask}>no Tasks found</div>
              )
            }
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(api + '/task')
  const tasks = await res.json()
  return {
    props: { tasks: tasks.data }
  }
}