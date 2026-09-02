import MembersForm from "../../components/MembersForm/MembersForm";

export default function RegisterNewMember() {
  return (
    <section>
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Bli medlem i InfoFynd
        </h1>
        <p className="text-sm sm:text-base opacity-80 max-w-lg mx-auto">
          Få tillgång till unika lokala erbjudanden och rabattkoder direkt i
          inkorgen.
        </p>
      </div>

      <MembersForm />
    </section>
  );
}
