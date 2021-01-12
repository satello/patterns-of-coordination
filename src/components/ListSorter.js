import React from 'react'
import PropTypes from 'prop-types';
import ListSort from './ListSort';
import styled from 'styled-components'

const OptionText = styled.div`
  font-size: 16px;
`

class ListSortDemo extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    newchildren: PropTypes.function
  };

  static defaultProps = {
    className: 'list-sort-demo',
  };

  render() {
    const childrenToRender = this.props.data.map((item, i) => {
      return (
        <div key={i} className={`${this.props.className}-list`}>
          <div className={`${this.props.className}-text`}>
            <OptionText>{item}</OptionText>
          </div>
        </div>
      );
    });
    return (
      <div className={`${this.props.className}-wrapper`}>
        <div className={this.props.className}>
          <ListSort
            dragClassName="list-drag-selected"
            appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
            onChange={this.props.newchildren}
          >
            {childrenToRender}
          </ListSort>
        </div>
      </div>
    );
  }
}

export default ListSortDemo;
