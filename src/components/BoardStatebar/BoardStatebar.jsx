import './BoardStatebar.css'

function BoardStatebar({
  direction = 'row',
  size = 0
}) {

  const nodes = new Array(size).fill(0).map((_, i) => {
    return <div key={i} className="state">{i + 1}</div>
  });

  const classNames = ['state-bar'];
  if (direction === 'column') {
    classNames.push('column-direction');
  }

  const classNamesStr = classNames.join(' ');
  
  return (
    <div className={classNamesStr}>
      {nodes}
    </div>
  );
}

export default BoardStatebar;
