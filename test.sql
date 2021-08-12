insert into hp_patient_card (patient_no, service, patient_category, payment_mode, reference, scheme, isurer,
                             expiry_date, doctor, debit, credit, date, activity_code, main_service, dosage,
                             scheme_staff_no, paid, transaction_type, collected, description, invoice_no, user_name,
                             cash_point, ip_no)
select trim(adm_no),
       trim(description),
       '',
       'Scheme',
       trim(doc_no),
       trim(company),
       '', date, '', amount, balance, date, trim (gl_acc), trim (rev_code), 1, trim (stf_accno), 'true', trim (type), 'true', trim (gl_acc), trim (d_note), trim (inputby), '', 'IP'
from stftrans