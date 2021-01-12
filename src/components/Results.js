import { Row, Col, Button } from 'antd'
import React from 'react'

const answerIndexMap = [
  'shape', 'swing', 'hang', 'thrust'
]
const scoringMatrix = [
  [2,1,0,3],
  [3,1,2,0],
  [0,3,2,1],
  [3,0,2,1]
]

export default ({resultsMatrix, restart}) => {

  const getScores = () => {
    let scores = []
    for (let j=0; j < answerIndexMap.length; j++) {
      let s = 0
      for (let i=0; i < scoringMatrix.length; i++) {
        const _scoreIndex = scoringMatrix[i][j]
        s += resultsMatrix[i][_scoreIndex] + 1
      }
      scores[j] = s
    }
    return scores
  }
  const scores = getScores()

  return (
    <div>
      <Row>
        <Col lg={4} offset={20}>
          <Button onClick={restart}>Start Over</Button>
        </Col>
      </Row>
      {
        answerIndexMap.map((k, i) => (
          <div>{k.toUpperCase()}: {scores[i]}</div>
        ))
      }
    </div>
  )
}
