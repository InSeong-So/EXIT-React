import PropTypes from 'prop-types';
import 'antd/dist/antd.css'

const App = () => {
  return (
    <Component />
  )
}

// 안정성을 높이기 위해
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default App