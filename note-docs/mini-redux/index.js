// redux第一准则: 单一数据源, 即应用程序的状态存于一处
var store;

function getInstance() {
  if (!store) store = createStore();
  return store;
}
function createStore() {
  // 当前状态
  var currentState = {};

  // 返回当前状态的拷贝，防止外部修改它
  function getState() {
    return {...currentState}
  }
  // 所有的reducers
  var currentReducerSet = {};
  // 默认reducer
  var currentReducer = function(state, action) {
    return state;
  }

  function addReducers(reducers) {
    currentReducerSet = Object.assign(currentReducerSet, reducers);
    // a state tree is a set of key-associated pure reducer functions.
    // A state tree property and a reducer have a 1:1 relationship. There should never be two different reducer functions associated with the same key.
    currentReducer = function(state, action) {
      var cumulativeState ={};

      for(const key in reducers) {
        cumulativeState[key] = currentReducerSet[key](state[key], action);
      }

      return cumulativeState;
    }
  }

  // store需要通知外界状态已变化
  var subscribers = [];

  function subscribe(fn) {
    subscribers.push(fn)
  }

  function unsubscribe(fn) {
    subscribers.splice(subscribers.indexOf(fn), 1);
  }

  function dispatch(action) {
    var prevState = currentState;
    // 计算最新状态
    currentState = currentReducer({...currentState}, action);
    // 通知订阅者
    subscribers.forEach(function(subscriber) {
      subscriber(currentState, prevState);
    })

  }

  
  return {
    addReducers,
    dispatch,
    subscribe,
    unsubscribe,
    getState
  }
}

module.exports = getInstance();