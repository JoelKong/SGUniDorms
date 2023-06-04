import {
  nusResidences,
  ntuResidences,
  smuResidences,
} from "../../../utils/universities";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export default function HallSelection(): JSX.Element {
  const router = useRouter();

  return (
    <section className="flex justify-center items-center w-full h-24">
      <select
        className="w-3/4 lg:w-1/4 rounded-lg h-10 pl-2"
        onChange={(e) => router.push(e.target.value)}
        defaultValue="1"
      >
        <option disabled value="1" hidden>
          Choose your school
        </option>
        <option disabled>NUS</option>
        {nusResidences.map((nus) => {
          return (
            <option key={uuidv4()} value={`/${nus}`}>
              <span>{nus}</span>
            </option>
          );
        })}
        <option disabled>NTU</option>
        {ntuResidences.map((ntu) => {
          return (
            <option key={uuidv4()} value={`/${ntu}`}>
              <span>{ntu}</span>
            </option>
          );
        })}
        <option disabled>SMU</option>
        {smuResidences.map((smu) => {
          return (
            <option key={uuidv4()} value={`/${smu}`}>
              <span>{smu}</span>
            </option>
          );
        })}
      </select>
    </section>
  );
}
