export default function Control({ index, onClick, icon}) {
  return (
    <div key={index} className={`control-${index}`}>
      <button onClick={onClick} />
      <style>
        {`
          .control-${index} button:before {
            content: "${icon}";
          }
        `}
      </style>
    </div>
  );
};
