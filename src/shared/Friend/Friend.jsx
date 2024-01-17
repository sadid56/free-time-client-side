/* eslint-disable react/prop-types */

const Friend = ({ friend }) => {
  const { name, email, _id, photo } = friend;
  return (
    <div className="space-y-2 shadow-xl border p-5 rounded-md">
      <div className="avatar flex justify-center">
        <div className="w-14 rounded-full">
          <img src={photo} />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900 text-center">{name}</h2>
      <h2 className="font-semibold text-slate-600 text-center">{email}</h2>
      <h2 className="text-sm text-slate-500 font-medium text-center">{_id}</h2>
    </div>
  );
};

export default Friend;
