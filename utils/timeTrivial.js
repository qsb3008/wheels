module.exports = createHistory = () => {
  const timeline = {};
  timeline.past = [];
  timeline.futrue = [];

  timeline.gotoState = (index) => {
    const { past, futrue, present } = timeline
    const allState = [ ...past, present, ...futrue ]
    
    timeline.present = allState[index]
    timeline.past = allState.slice(0, index)
    timeline.futrue = allState.slice(index + 1)
  }

  timeline.getIndex = () => {
    return timeline.past.length
  }

  // 保存当前状态
  timeline.push = (currentState) => {
    // 将状态都保存，并更新当前状态
    if (timeline.present) {
      timeline.past.push(timeline.present);
    }
    timeline.present = currentState;
  }
  // 后退
  timeline.undo = () => {
    if (timeline.past.length !== 0) {
      timeline.gotoState(timeline.getIndex() - 1);
    }
  };

  // 前进
  timeline.redo = () => {
    if (timeline.futrue.length !== 0) {
      timeline.gotoState(timeline.getIndex() + 1);
    }
  };

  return timeline;
};