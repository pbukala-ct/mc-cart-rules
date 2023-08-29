import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import TextField from '@commercetools-uikit/text-field';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import SelectField from '@commercetools-uikit/select-field';
import { CHANNEL_ROLES } from './constants';
import validate from './validate';
import messages from './messages';
import DataTable from '@commercetools-uikit/data-table';
import Grid from '@commercetools-uikit/grid';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Constraints from '@commercetools-uikit/constraints';


import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';


// Initialize an empty object to store grouped values
const groupedValues = {};
const columns = [
  { key: 'day', label: 'Day' },
  { key: 'trading', label: 'Trading hours' },
  { key: 'picking', label: 'Picking hours' }
 
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'day':
      
      return item.day;
      
    case 'trading':
      return item.tradingHours[0] +' - '+item.tradingHours[1];
    case 'picking':
      return item.pickingHours[0] +' - '+item.pickingHours[1];
       
    default:
      return 'default' ;
  }
};


const getRoleOptions = Object.keys(CHANNEL_ROLES).map((key) => ({
  label: CHANNEL_ROLES[key],
  value: CHANNEL_ROLES[key],
}));

const ChannelDetailsForm = (props) => {
  const intl = useIntl();
  // const customData = [
  //   {day: 'Monday',
  //   trading: '09:00 - 11:00' 
  //  }
  // ];
  const tableSorting = useDataTableSortingState({ key: 'day', order: 'asc' });
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });


formik.values.customData.forEach(obj => {
  const day = obj.name.split("_")[2]; 
  const typeName = obj.name.split("_")[0]; 
  
  if (!groupedValues[day]) {
    groupedValues[day] = {
      day: day.charAt(0).toUpperCase() + day.slice(1),
      tradingHours: [],
      pickingHours: []
    };
  }

  if (typeName === "trading") {
    groupedValues[day].tradingHours = obj.value;
  } else if (typeName === "picking") {
    groupedValues[day].pickingHours = obj.value;
  }
});

// Create the final output array
const outputArray = Object.values(groupedValues);

// Define an order of days for sorting
const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Sort the output array based on the defined day order
outputArray.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));


  const formElements = (
    <Spacings.Stack scale="l">

<Text.Subheadline as="h3" intlMessage={messages.tableTitle} />

<DataTable
    name="trading_hours"
    title={intl.formatMessage(messages.channelNameLabel)}
    isCondensed
    columns={columns}
    rows={outputArray}
    itemRenderer={itemRenderer}
    horizontalConstraint={13}
    onBlur={formik.handleBlur}
    touched={formik.touched.roles}
    onChange={formik.handleChange}
    />

<Constraints.Horizontal max={22}>
        <ContentNotification type="success">
          <Text.Body intlMessage={messages.infoBoxOne} />
        </ContentNotification>
 </Constraints.Horizontal>



<Grid
   gridGap="30px"
   gridAutoColumns="2fr"
   gridTemplateColumns="repeat(4, 1fr)">

<TextField
        name="picking_hours_monday"
        title={"Picking hours Monday"}
        value={formik.values.picking_hours_monday}
        errors={formik.errors.picking_hours_monday}
        touched={formik.touched.picking_hours_monday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={13}
      />

<TextField
        name="trading_hours_monday"
        title={"Trading hours Monday"}
        value={formik.values.trading_hours_monday}
        errors={formik.errors.trading_hours_monday}
        touched={formik.touched.trading_hours_monday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={13}
      />
<TextField
        name="picking_hours_tuesday"
        title={"Picking hours Tuesday"}
        value={formik.values.picking_hours_tuesday}
        errors={formik.errors.picking_hours_tuesday}
        touched={formik.touched.picking_hours_tuesday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={13}
      />

<TextField
        name="trading_hours_tuesday"
        title={"Trading hours Tuesday"}
        value={formik.values.trading_hours_tuesday}
        errors={formik.errors.trading_hours_tuesday}
        touched={formik.touched.trading_hours_tuesday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={13}
      />

<TextField
        name="picking_hours_wednesday"
        title={"Picking hours Wednesday"}
        value={formik.values.picking_hours_wednesday}
        errors={formik.errors.picking_hours_wednesday}
        touched={formik.touched.picking_hours_wednesday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={13}
      />

<TextField
        name="trading_hours_wednesday"
        title={"Trading hours Wednesday"}
        value={formik.values.trading_hours_wednesday}
        errors={formik.errors.trading_hours_wednesday}
        touched={formik.touched.trading_hours_wednesday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={13}
      />

<TextField
        name="picking_hours_thursday"
        title={"Picking hours Thursday"}
        value={formik.values.picking_hours_thursday}
        errors={formik.errors.picking_hours_thursday}
        touched={formik.touched.picking_hours_thursday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={13}
      />

<TextField
        name="trading_hours_thursday"
        title={"Trading hours Thursday"}
        value={formik.values.trading_hours_thursday}
        errors={formik.errors.trading_hours_thursday}
        touched={formik.touched.trading_hours_thursday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={13}
      />

</Grid>


<Constraints.Horizontal max={22}>
        <ContentNotification type="info">
        <Text.Body intlMessage={messages.infoBoxTwo} />
        </ContentNotification>
 </Constraints.Horizontal>

      <TextField
        name="key"
        title={intl.formatMessage(messages.channelKeyLabel)}
        value={formik.values.key}
        errors={formik.errors.key}
        touched={formik.touched.key}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isReadOnly={props.isReadOnly}
        renderError={(errorKey) => {
          if (errorKey === 'duplicate') {
            return intl.formatMessage(messages.duplicateKey);
          }
          return null;
        }}
        isRequired
        horizontalConstraint={13}
      />
     
      <LocalizedTextField
        name="name"
        title={intl.formatMessage(messages.channelNameLabel)}
        value={formik.values.name}
        errors={formik.errors.name}
        touched={Boolean(formik.touched.name)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        selectedLanguage={props.dataLocale}
        isReadOnly={props.isReadOnly}
        horizontalConstraint={13}
      />
      <LocalizedTextField
        name="description"
        title={intl.formatMessage(messages.channelDescriptionLabel)}
        value={formik.values.description}
        errors={formik.errors.description}
        touched={Boolean(formik.touched.description)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        selectedLanguage={props.dataLocale}
        isReadOnly={props.isReadOnly}
        horizontalConstraint={13}
      />
  
          


      {/* <SelectField
        name="roles"
        title={intl.formatMessage(messages.channelRolesLabel)}
        value={formik.values.roles}
        errors={formik.errors.roles}
        touched={formik.touched.roles}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isMulti
        options={getRoleOptions}
        isReadOnly={props.isReadOnly}
        isRequired
        horizontalConstraint={13}
      /> */}
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};
ChannelDetailsForm.displayName = 'ChannelDetailsForm';
ChannelDetailsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.object,
    version: PropTypes.number,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default ChannelDetailsForm;
