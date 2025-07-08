import { Option } from "../option";

export async function bootstrapOptions() {
  try {
    await bootstrapUniversities();
  } catch (error) {
    console.error("❌ Failed to bootstrap options:", error);
  }
}

async function bootstrapUniversities() {
  try {
    const universities = [
      // Federal Universities
      "Abubakar Tafawa Balewa University",
      "Ahmadu Bello University",
      "Bayero University, Kano",
      "Federal University Gashua",
      "Federal University of Petroleum Resources, Effurun",
      "Federal University of Technology, Akure",
      "Federal University of Technology, Minna",
      "Federal University of Technology, Owerri",
      "Federal University, Dutse",
      "Federal University, Dutsin-Ma",
      "Federal University, Kashere",
      "Federal University, Lafia",
      "Federal University, Lokoja",
      "Federal University, Ndifu-Alike",
      "Federal University, Otuoke",
      "Federal University, Oye-Ekiti",
      "Federal University, Wukari",
      "Michael Okpara University of Agriculture",
      "Modibbo Adama University of Technology",
      "National Open University of Nigeria",
      "Nnamdi Azikiwe University",
      "Obafemi Awolowo University",
      "University of Abuja",
      "University of Agriculture, Makurdi",
      "University of Benin",
      "University of Calabar",
      "University of Ibadan",
      "University of Ilorin",
      "University of Jos",
      "University of Lagos",
      "University of Maiduguri",
      "University of Nigeria, Nsukka",
      "University of Port Harcourt",
      "University of Uyo",
      "Usmanu Danfodiyo University, Sokoto",

      // State Universities
      "Abia State University",
      "Adamawa State University",
      "Adekunle Ajasin University",
      "Akwa Ibom State University",
      "Ambrose Alli University",
      "Anambra State University",
      "Bauchi State University",
      "Benue State University",
      "Chukwuemeka Odumegwu Ojukwu University",
      "Cross River University of Technology",
      "Delta State University",
      "Ebonyi State University",
      "Edo State University",
      "Ekiti State University",
      "Enugu State University of Science and Technology",
      "Gombe State University",
      "Ibrahim Badamasi Babangida University",
      "Ignatius Ajuru University of Education",
      "Imo State University",
      "Kaduna State University",
      "Kano University of Science and Technology",
      "Kebbi State University of Science and Technology",
      "Kogi State University",
      "Kwara State University",
      "Ladoke Akintola University of Technology",
      "Lagos State University",
      "Nasarawa State University",
      "Niger Delta University",
      "Niger State University of Education",
      "Olabisi Onabanjo University",
      "Ondo State University of Science and Technology",
      "Osun State University",
      "Plateau State University",
      "Rivers State University",
      "Sokoto State University",
      "Tai Solarin University of Education",
      "Taraba State University",
      "Umaru Musa Yar’adua University",
      "Yobe State University",
      "Zamfara State University",

      // Private Universities (Selected)
      "Afe Babalola University",
      "Ajayi Crowther University",
      "Al-Hikmah University",
      "American University of Nigeria",
      "Anchor University",
      "Babcock University",
      "Baze University",
      "Bells University of Technology",
      "Benson Idahosa University",
      "Bowen University",
      "Caleb University",
      "Covenant University",
      "Crawford University",
      "Fountain University",
      "Godfrey Okoye University",
      "Joseph Ayo Babalola University",
      "Landmark University",
      "Lead City University",
      "Madonna University",
      "Nile University of Nigeria",
      "Redeemer’s University",
      "Renaissance University",
      "Salem University",
      "Samuel Adegboyega University",
      "Veritas University",
      "Wellspring University",
      "Western Delta University",
    ];

    for (const university of universities) {
      await Option.create({
        option_name: university
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z_]/g, ""),
        option_type: "university",
        option_value: university,
      });
    }
    console.log("👌 Universities bootstrapped successfully");
  } catch (error) {
    console.error("❌ Failed to bootstrap universities:", error);
  }
}
