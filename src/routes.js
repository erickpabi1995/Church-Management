import React from "react";



/******************* project components **************** */

const UnAuthorizedAccess = React.lazy(() =>
  import("./components/UnAuthorizedAccess")
);
// const StockTab = React.lazy(() =>
//   import("./components/warehouse/stock/LabTechnician")
// );
const UnitOfMesurement = React.lazy(() =>
  import("./components/warehouse/unit_of_measurement/UnitOfMesurement")
);

const Address = React.lazy(() =>
  import("./components/records/patients/address/Address")
);

const DepartmentStore = React.lazy(() =>
  import("./components/warehouse/department_store/DepartmentStore")
);

const Habit = React.lazy(() => import("./components/Habit/Habit"));

const NeedType = React.lazy(() => import("./components/NeedType/NeedType"));

const TempLoc = React.lazy(() => import("./components/temperature_location/TemperatureLocation"));

const BookingType = React.lazy(() => import("./components/BookingType/BookingType"));

const ANCRegister = React.lazy(() => import("./components/maternity module/ANCRegister/ANCRegister"));

const ANCProgress = React.lazy(() => import("./components/maternity module/ANCProgress/ANCProgress"));

const ANCItemSupplied = React.lazy(() => import("./components/maternity module/ANCItemSupplied/ANCItemSupplied"));

const PatientBooking = React.lazy(() => import("./components/PatientBooking/PatientBooking"));

const RiskFactor = React.lazy(()=> import("./components/maternity module/Risk Factor/RiskFactor"))

const Organ = React.lazy(()=> import("./components/maternity module/Organ/Organ"))


const NewbornAbdominalSigns = React.lazy(()=> import("./components/maternity module/Newborn Abdominal Signs/NewbornAbdominalSigns"))

const Topic = React.lazy(()=> import("./components/maternity module/Topic/Topic"))

const ExamsType = React.lazy(()=> import("./components/maternity module/Examination Type/ExamsType"))

const Infection = React.lazy(()=> import("./components/maternity module/Infection/Infection"))

const VulvaCondition = React.lazy(()=> import("./components/maternity module/Vulva Condition/Vulva_Condition"))

const VaginalPart = React.lazy(()=> import("./components/maternity module/Vagina Part/Vagina_Part"))

const Diagnosis = React.lazy(()=> import("./components/Diagnosis/Diagnosis"))

const FamilyCondition = React.lazy(()=> import("./components/maternity module/Family Condition/Family Condition"))

const Condition = React.lazy(()=> import("./components/maternity module/Condition/Condition"))

const Treatment = React.lazy(()=> import("./components/maternity module/Treatment/Treatment"))

const Oxytocin = React.lazy(()=> import("./components/maternity module/Oxytocin/Oxytocin"))

const Presentation = React.lazy(()=> import("./components/maternity module/Presentation/Presentation"))

const InterventionType = React.lazy(() =>
  import("./components/InterventionType/InterventionType")
);
const ProductCategory = React.lazy(() =>
  import("./components/warehouse/product_catogory/ProductCategory")
);
const ProductType = React.lazy(() =>
  import("./components/warehouse/product_type/ProductType")
);
const WarehouseProduct = React.lazy(() =>
  import("./components/warehouse/warehouse_product/WarehouseProduct")
);
const QuantityUnitType = React.lazy(() =>
  import("./components/warehouse/quantity_unit_type/QunatityUnitType")
);
const WarehouseStock = React.lazy(() =>
  import("./components/warehouse/warehouse_stock/WarehouseStock")
);
const Disease = React.lazy(() =>
  import("./components/Disease/Disease")
);
const Surgery = React.lazy(() =>
  import("./components/Surgery/Surgery")
);
const Workflow = React.lazy(() => import("./components/workflow/Workflow"));
const RequestedProcedure = React.lazy(() =>
  import("./components/procedure/Procedure")
);

const MigrateRadiologyProcedure = React.lazy(() =>
  import("./components/Migration/MigrateRadiologyProcedure")
);

const MigrateRadiologyProcedurePrice = React.lazy(() =>
  import("./components/Migration/MigrateRadiologyProcedurePrice")
);

const MigrateRadiologyProcedurePriceSponsor = React.lazy(() =>
  import("./components/Migration/MigrateRadiologyProcedurePriceSponsor")
);

/*****************WAREHOUSE************/

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/unauthorized",
    exact: true,
    name: "Unauthorized",
    component: UnAuthorizedAccess,
  },
  { path: "/reset-password", exact: true, name: "Reset Password" },

  
 
  {
    path: "/warehouse_stock",
    name: "Warehouse Stock",
    component: WarehouseStock,
    exact: true,
  },
  {
    path: "/settings/disease",
    name: "Disease",
    component: Disease,
    exact: true,
  },
  
 
  {
    path: "/settings/habit",
    name: "Habit",
    component: Habit,
    exact: true,
  },
  {
    path: "/settings/needType",
    name: "NeedType",
    component: NeedType,
    exact: true,
  },
  {
    path: "/settings/temperature_location",
    exact: true,
    name: "Temperature Location",
    component: TempLoc,
  },
  {
    path: "/settings/booking_type",
    exact: true,
    name: "Booking Type",
    component: BookingType,
  },
  {
    path: "/anc/anc_treatment",
    exact: true,
    name: "Treatment",
    component: Treatment,
  },
  {
    path: "/anc/anc_newborn",
    exact: true,
    name: "NewbornAbdominalSigns",
    component: NewbornAbdominalSigns,
  },
  {
    path: "/anc/anc_oxytocin",
    exact: true,
    name: "Oxytocin",
    component: Oxytocin,
  },
  {
    path: "/anc/anc_register",
    exact: true,
    name: "ANC Register",
    component: ANCRegister,
  },
  {
    path: "/anc/anc_progress",
    exact: true,
    name: "ANC Progress",
    component: ANCProgress,
  },
  {
    path: "/anc/anc_item_supplied",
    exact: true,
    name: "ANC Item Supplied",
    component: ANCItemSupplied,
  },
  {
    path: "/anc/anc_presentation",
    exact: true,
    name: "ANC Presentation",
    component: Presentation,
  },
  {
    path: "/anc/anc_risk_factors",
    exact: true,
    name: "Risk Factor",
    component: RiskFactor,
  },
  {
    path: "/anc/anc_organ",
    exact: true,
    name: "Organ",
    component: Organ,
  },
  {
    path: "/anc/anc_examsType",
    exact: true,
    name: "ExamsType",
    component: ExamsType,
  },
  {
    path: "/anc/anc_infection",
    exact: true,
    name: "Infection",
    component: Infection,
  },
  {
    path: "/anc/anc_vulvaCondition",
    exact: true,
    name: "VulvaCondition",
    component: VulvaCondition,
  },
  {
    path: "/anc/anc_family_condition",
    exact: true,
    name: "Family Condition",
    component: FamilyCondition,
  },
  {
    path: "/anc/anc_condition",
    exact: true,
    name: "Condition",
    component: Condition,
  },
  {
    path: "/anc/anc_vaginalPart",
    exact: true,
    name: "Vaginal Part",
    component: VaginalPart,
  },
  {
    path: "/settings/diagnosis",
    exact: true,
    name: "Diagnosis",
    component: Diagnosis,
  },
  {
    path: "/booking/patient_booking",
    exact: true,
    name: "Patient Schedules",
    component: PatientBooking,
  },

  
  {
    path: "/procedure/requestedProcedure",
    name: "Procedure",
    component: RequestedProcedure,
    exact: true,
  },


  // {
  //   path: "/settings/consultation_procedure",
  //   name: "Consultation Procedure",
  //   component: ConsultationProcedure,
  //   exact: true,
  // },
 
  // {
  //   path: "/records/attendance",
  //   name: "Attendance",
  //   component: Attendance,
  //   exact: true,
  // },
  
  {
    path: "/anc/anc_topic",
    name: "Topic",
    component: Topic,
    exact: true,
  },

 
  {
    path: "/warehouse_product",
    name: "Warehouse Product",
    component: WarehouseProduct,
    exact: true,
  },
  
  
  {
    path: "/warehouse_stock",
    name: "Warehouse Stock",
    component: WarehouseStock,
    exact: true,
  },

  {
    path: "/warehouse_product",
    name: "Warehouse Product",
    component: WarehouseProduct,
    exact: true,
  },

  {
    path: "/warehouse_stock",
    name: "Warehouse Stock",
    component: WarehouseStock,
    exact: true,
  },
 
  {
    path: "/warehouse_product",
    name: "Warehouse Product",
    component: WarehouseProduct,
    exact: true,
  },
 
  {
    path: "/records/address",
    name: "Address",
    component: Address,
    exact: true,
  },



 

  {
    path: "/settings/product_category",
    name: "Product Categories",
    component: ProductCategory,
    exact: true,
  },
  {
    path: "/settings/intervType",
    name: "Intervention Type",
    component: InterventionType,
    exact: true,
  },
  {
    path: "/settings/unit_of_measurement",
    name: "Unit of Measurement",
    component: UnitOfMesurement,
    exact: true,
  },
 
 
 


  {
    path: "/migrations/migrate-radiology-procedure",
    name: "Migrate Radiology Procedure",
    component: MigrateRadiologyProcedure,
    exact: true,
  },
  {
    path: "/migrations/migrate-radiology-procedure-price",
    name: "Migrate Radiology Procedure Price",
    component: MigrateRadiologyProcedurePrice,
    exact: true,
  },
  {
    path: "/migrations/migrate-radiology-procedure-price-sponsor",
    name: "Migrate Radiology Procedure Price Sponsor",
    component: MigrateRadiologyProcedurePriceSponsor,
    exact: true,
  },

  {
    path: "/warehouse/department-store",
    name: "Department Store",
    component: DepartmentStore,
    exact: true,
  },
  {
    path: "/warehouse/product-category",
    name: "Product Category",
    component: ProductCategory,
    exact: true,
  },

  {
    path: "/warehouse/product-type",
    name: "Product Type",
    component: ProductType,
    exact: true,
  },
  {
    path: "/warehouse/quantity-unit-type",
    name: "Quantity Unit Type",
    component: QuantityUnitType,
    exact: true,
  },
  {
    path: "/warehouse/stock",
    name: "Stock",
    component: WarehouseStock,
    exact: true,
  },
  {
    path: "/warehouse/unit-of-measure",
    name: "Unit Of Measure",
    component: UnitOfMesurement,
    exact: true,
  },
  
  {
    path: "/warehouse/product",
    name: "Warehouse Product",
    component: WarehouseProduct,
    exact: true,
  },
  {
    path: "/warehouse/stock",
    name: "Warehouse Stock",
    component: WarehouseStock,
    exact: true,
  },


  { path: "/apps/email/inbox", exact: true, name: "Inbox" },
  { path: "/apps/email/compose", exact: true, name: "Compose" },

  { path: "/apps/email/message", exact: true, name: "Message" },
];

export default routes;
