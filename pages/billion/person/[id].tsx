import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface FinancialAsset {
  ticker: string;
  numberOfShares: number;
  exerciseOptionPrice?: number;
}
interface PersonResponse {
  id: string;
  name: string;
  netWorth: number;
  country: string;
  industries: string[];
  bio: string;
  financialAssets: FinancialAsset[];
}

const BillionPerson: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<PersonResponse>();
  const getData = async () => {
    await fetch(`https://billions-api.nomadcoders.workers.dev/person/${router.query.id}`)
      .then((json) => setData(JSON.parse(JSON.stringify(json))))
  };
  useEffect(() => {
    if (router) {
      getData();
    }
  }, [router]);
  return (
    <div className="mx-48 my-20">
      <div>
        <img src={data?.squareImage} className="aspect-square rounded-lg" />
        <div className="mt-2 mb-10">
          <h3 className="text-2xl font-bold">{data?.name}</h3>
          <div className="my-5">
            <p>Networth : {Math.round(data?.netWorth / 1000)} Billion</p>
            <p>Country : {data?.country}</p>
            <p>Industries : {data?.industries}</p>
            <p className="my-5">{data?.bio}</p>
          </div>
          <hr className="my-5" />
          <h3 className="text-2xl font-bold">Financial Assets</h3>
          <div className="grid grid-cols-4 gap-5 my-5">
            {data?.financialAssets.map((asset, index) => (
              <div
                key={index}
                className="border-[1px] border-slate-200 p-5 rounded-md"
              >
                <p>Ticker : {asset.ticker}</p>
                <p>Shares: {(asset.numberOfShares).toLocaleString("ko-KR")}</p>
                {asset.exerciseOptionPrice ? (<p>Exercise Price: ${asset.exerciseOptionPrice}</p>) : (null)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillionPerson;
