import mock from './mock';
import docs from './docs.md';

let week = sb.section('The Week');

week
  .story('Days of the week')
  .add('Monday', '<p>{{ vm.days.mon }}</p>', mock, docs)
  .add('Tuesday', '<p>{{ vm.days.tues }}</p>', mock, docs)
  .add('Wednesday', '<p>{{ vm.days.wed }}</p>', mock, docs);

let month = sb.section('The Month');

month
  .story('Months of the year')
  .add('January', '<p>{{ vm.months.jan }}</p>', mock, docs)
  .add('February', '<p>{{ vm.months.feb }}</p>', mock, docs)
  .add('March', '<p>{{ vm.months.mar }}</p>', mock, docs);
