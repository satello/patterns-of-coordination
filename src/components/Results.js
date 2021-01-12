import { Row, Col, Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import SHAPE from '../assets/SHAPE.png'
import HANG from '../assets/HANG.png'
import SWING from '../assets/SWING.png'
import THRUST from '../assets/THRUST.png'

const ResultsBox = styled.div`
  margin-top: 50px;
  padding: 20px;
`
const PatternImg = styled.img`
  width: 100%;
  padding: 10px;
`
const PatternName = styled.div`
  margin-top: 25px;
  font-size: 45px;
  font-weight: 600;
  text-align: center;
`
const Score = styled.div`
  font-size: 35px;
  font-weight: 500;
  text-align: center;
`
const ScoreCol = styled(Col)`
  padding: 10px;
  box-shadow: 0px 6px 24px rgba(77, 0, 180, 0.05);

  &:hover {
    box-shadow: 0px 6px 24px rgba(77, 0, 180, 0.25);
  }
`

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
  const answersMap = {
    "shape": {
      score: scores[0],
      img: SHAPE
    },
    "swing": {
      score: scores[1],
      img: SWING
    },
    "hang": {
      score: scores[2],
      img: HANG
    },
    "thrust": {
      score: scores[3],
      img: THRUST
    },
  }

  return (
    <div>
      <Row>
        <Col lg={10}>
          <div style={{fontWeight: 600, fontSize: '24px'}}>Results</div>
        </Col>
        <Col lg={4} offset={10}>
          <Button onClick={restart}>Start Over</Button>
        </Col>
      </Row>
      <ResultsBox>
        <Row>
        {
          Object.keys(answersMap).map((k) => (
            <ScoreCol lg={12}>
              <Row>
                <Col lg={12}>
                  <PatternImg src={answersMap[k].img} />
                </Col>
                <Col lg={12}>
                  <PatternName>{k.toUpperCase()}</PatternName>
                  <Score>{(((16 - Number(answersMap[k].score)) / 24) * 100).toFixed(1)} %</Score>
                </Col>
              </Row>
            </ScoreCol>
          ))
        }
        </Row>
      </ResultsBox>
    </div>
  )
}
