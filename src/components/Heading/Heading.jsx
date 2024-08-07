/* eslint-disable react/prop-types */

function Heading({ title }) {
  return (
    <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
      {title}
    </h1>
  );
}

export default Heading;
