import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ListResponse {
  id: string;
  industries: string[];
  name: string;
  netWorth: number;
  squareImage: string;
}

const BillionIndex: NextPage = () => {
  const [data, setData] = useState<ListResponse[]>();
  const getData = async () => {
    await fetch("https://billions-api.nomadcoders.workers.dev/").then(
      (res) => res.json()
    ).then((json) => setData(json));
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="grid grid-cols-4 m-20">
      {data?.map((person) => (
        <Link key={person.id} href={`billion/person/${person.id}`}>
          <div>
            <img
              src={person.squareImage}
              className="aspect-square rounded-lg"
            />
            <div className="mt-2 mb-10">
              <h3 className="text-2xl font-bold">{person.name}</h3>
              <div className="flex space-x-3">
                <span className="">
                  {Math.round(person.netWorth / 1000)}
                  <span className="text-sm"> billion</span>
                </span>
                <span>/</span>
                <span>{person.industries}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BillionIndex;