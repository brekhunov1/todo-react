function TaskItem({ text, done, onToggle, onDelete }) {
  return (
    <div
      onClick={onToggle}
      style={{
        padding: '12px',
        marginBottom: '8px',
        background: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        textDecoration: done ? 'line-through' : 'none',
        color: done ? '#999' : 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {text}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        style={{ marginLeft: '8px', background: 'none', color: 'red', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        ✕
      </button>
    </div>
  );
}

export default TaskItem;
