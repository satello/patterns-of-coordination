import { Button, Row, Col } from 'antd'
import React, { useState, useEffect } from 'react'
import ListSorter from '../components/ListSorter'
import Results from '../components/Results'
import styled from 'styled-components'
import Banner from '../assets/banner.png'
import _ from 'lodash'

const PatternsOfCoordinationContainer = styled.div`
  margin-top: 75px;
`
const TitleDiv = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: 50px 0px;
`
const ButtonsRow = styled(Row)`
  margin-top: 35px;
`
const BannerImg = styled.img`
  margin-top:0px;
  width: 100%;
`

// https://motion.ant.design/exhibition/demo/list-sort
// For each question drag and drop
// go through the pages 1 ... n
// at the end calculate result

const questions = [
  'I get the most enjoyment out of situations which involve',
  'In working with others, I become most impatient when they',
  'When working on a task, I tend to place the greatest emphasis on',
  'I feel most unhappy with myself when I have'
]
const options = [
  ['Exploring new and innovative ideas, concepts, principles, and theories', 'Contacts with others where I will have an opportunity to examine and understand the underlying emotions, feelings, interactions, and behavior of people.', 'Of logic, reason, and systematic inquiry in an orderly process of problem definition, analysis, and solution.', 'The utilization of energy and resources to achieve goals where I will receive prompt and tangible feedback on the results of my efforts.'],
  ['Spend too much time deliberating and won\'t act.', 'Lack an awareness of the human aspects of the situation.', 'Get hung up on old ways of doing things and aren\'t willing to consider something new.', 'Haven\'t devoted sufficient time to make a careful analysis of all the relevant factors in the matter.'],
  ['Making certain that I\'m consistent, systematic, and rational.', 'The attainment of the immediate endpoint by whatever means or methods make the most sense at the time.', 'The possible future impact and long-range ramifications.', 'Established values, and the feelings or reactions others might have to my approach.'],
  ['Caused others some unpleasantness and damaged our working relationship as a result.', 'Delayed in taking action, then lost out on the opportunity to achieve the objective.', 'Been content to use an old, familiar method on a task, then found that someone else had developed a new approach for it.', 'overlooked some relevant facts, or done a slipshod job in analyzing the data I\'ve assembled.']
]
const answersMatrix = [
  [0,1,2,3],
  [0,1,2,3],
  [0,1,2,3],
  [0,1,2,3]
]

export default () => {
  const [ questionIndex, setQuestionIndex ] = useState(-1)
  const [ answers, setAnswers ] = useState(answersMatrix)

  const resetTest = () => {
    setQuestionIndex(0)
    setAnswers(answersMatrix)
  }

  const newChildren = (_newChildren) => {
    let _answers = [0,1,2,3]
    for (let i=0; i < options[questionIndex].length; i++) {
      const _phrase = _newChildren[i].props.children.props.children.props.children
      const _index = options[questionIndex].indexOf(_phrase)
      _answers[_index] = i
    }
    const _answersCopy = _.cloneDeep(answers)
    _answersCopy[questionIndex] = _answers
    setAnswers(_answersCopy)
  }
  console.log(answers)

  return (
    <PatternsOfCoordinationContainer>
      {
        questionIndex === -1 ? (
          <div>
            <Row>
              <Col lg={19}>
                <div style={{fontWeight: 600}}>“Everything that irritates us about others can lead us to an understanding about ourselves.” - Carl Jung </div>
              </Col>
              <Col lg={4} offset={1}>
                <Button type="primary" onClick={() => setQuestionIndex(0)}>Start!</Button>
              </Col>
            </Row>
            <BannerImg src={Banner} />
          </div>
        ) : (
          questionIndex === questions.length ? (
            <Results resultsMatrix={answers} restart={resetTest} />
          ) : (
            <div>
              <Row>
                <Col lg={19}>
                  <div>Instructions: Arrange the given options from <i>most</i> like you to <i>least</i> like you. (drag and drop)</div>
                </Col>
                <Col lg={4} offset={1}>
                  <Button onClick={resetTest}>Start Over</Button>
                </Col>
              </Row>
              <TitleDiv>{questions[questionIndex]}:</TitleDiv>
              <ListSorter data={options[questionIndex]} newchildren={newChildren} />
              <ButtonsRow>
                <Col lg={2} offset={18}>
                  <Button disabled={questionIndex === 0} onClick={() => setQuestionIndex(questionIndex - 1)}>Back</Button>
                </Col>
                <Col lg={2}>
                  <Button type='primary' disabled={questionIndex === questions.length} onClick={() => setQuestionIndex(questionIndex + 1)}>Next</Button>
                </Col>
              </ButtonsRow>
            </div>
          )
        )

      }
    </PatternsOfCoordinationContainer>
  )
}
